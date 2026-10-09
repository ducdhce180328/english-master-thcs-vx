import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import { transformSync } from 'esbuild';
import { spawn } from 'node:child_process';

// Run the real API against isolated temporary data; never modify the user's DB.
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'english-delete-'));
const serverFile = path.resolve('.verify-server.mjs');
const source = fs.readFileSync('server.ts', 'utf8').replace("path.join(__dirname, 'data')", JSON.stringify(dataDir));
fs.writeFileSync(serverFile, transformSync(source, { loader: 'ts', format: 'esm', target: 'es2022' }).code);
const child = spawn(process.execPath, [serverFile], { env: { ...process.env, PORT: '3099', NODE_ENV: 'production' }, stdio: ['ignore', 'pipe', 'pipe'] });
try {
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Server startup timeout')), 15000);
    child.stdout.on('data', chunk => {
      if (chunk.toString().includes('Server listening')) { clearTimeout(timeout); resolve(); }
    });
    child.on('exit', code => { clearTimeout(timeout); reject(new Error(`Server exited: ${code}`)); });
  });
  const api = async (route, method = 'GET', body) => {
    const response = await fetch(`http://localhost:3099${route}`, { method, headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
    return { status: response.status, body: await response.json() };
  };
  const created = await api('/api/db/class', 'POST', { name: 'Lớp kiểm tra xóa', grade: 6 });
  assert.equal(created.status, 200);
  const id = created.body.class.id;
  assert.deepEqual(created.body.class.students, []);
  const added = await api(`/api/db/classes/${id}/students`, 'POST', { name: 'Học sinh kiểm tra' });
  const sid = added.body.student.id;
  assert.equal((await api(`/api/db/classes/${id}/students/${sid}`, 'DELETE')).status, 200);
  for (let i = 0; i < 2; i++) {
    const cls = (await api('/api/db')).body.classes.find(c => c.id === id);
    assert.equal(cls.studentCount, 0);
    assert.deepEqual(cls.students, []);
  }
  assert.equal(JSON.parse(fs.readFileSync(path.join(dataDir, 'db.json'))).classes.find(c => c.id === id).students.length, 0);
  assert.equal((await api(`/api/db/classes/${id}/students/${sid}`, 'DELETE')).status, 404);
  assert.equal((await api(`/api/db/class/${id}`, 'DELETE')).status, 200);
  assert.equal((await api('/api/db')).body.classes.some(c => c.id === id), false);
  assert.equal((await api(`/api/db/class/${id}`, 'DELETE')).status, 404);
  for (const cls of (await api('/api/db')).body.classes) await api(`/api/db/class/${cls.id}`, 'DELETE');
  assert.deepEqual((await api('/api/db')).body.classes, []);
  console.log('PASS: create class → delete last student → reload → persisted empty roster → delete class → delete all classes; missing IDs return 404.');

  const values = new Map();
  const localStorage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  const storageSource = transformSync(fs.readFileSync('src/services/storageService.ts', 'utf8'), { loader: 'ts', format: 'cjs', target: 'es2022' }).code;
  const context = { module: { exports: {} }, localStorage, console, fetch: async () => ({ ok: true, json: async () => ({ classes: [] }) }) };
  vm.runInNewContext(storageSource, context);
  const storage = context.module.exports.storageService;
  storage.saveVocabWord({ id: 'word-test', word: 'school' });
  storage.removeSavedVocab('word-test');
  assert.equal(new context.module.exports.StorageService().getSavedVocab().length, 0);
  localStorage.setItem('em_local_classes', JSON.stringify([{ id: 'stale-class' }]));
  assert.equal((await storage.fetchClasses()).length, 0);
  assert.equal(JSON.parse(localStorage.getItem('em_local_classes')).length, 0);
  console.log('PASS: vocabulary removal persists; an empty server class list clears the stale cache.');
} finally {
  child.kill();
  await new Promise(resolve => child.exitCode !== null ? resolve() : child.once('exit', resolve));
  fs.unlinkSync(serverFile);
  // Only remove the exact temporary directory created by this script.
  fs.rmSync(dataDir, { recursive: true });
}
