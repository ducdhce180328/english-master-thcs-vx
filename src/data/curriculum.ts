import { UnitModule, ExamMatrix } from '../types';

export const CURRICULUM_DATA: Record<number, UnitModule[]> = {
  // LỚP 6
  6: [
    {
      unitNumber: 1,
      title: 'Unit 1: My New School',
      descriptionVi: 'Làm quen với trường học mới, dụng cụ học tập, môn học và thì Hiện tại đơn / Hiện tại tiếp diễn.',
      grade: 6,
      vocabularies: [
        {
          id: 'v6-1',
          word: 'calculator',
          ipa: '/ˈkælkjuleɪtər/',
          partOfSpeech: 'noun',
          meaningVi: 'máy tính cầm tay',
          exampleEn: 'I use a calculator in my math class.',
          exampleVi: 'Tôi dùng máy tính cầm tay trong giờ toán.',
          topic: 'School things',
          grade: 6,
          unit: 1
        },
        {
          id: 'v6-2',
          word: 'uniform',
          ipa: '/ˈjuːnɪfɔːm/',
          partOfSpeech: 'noun',
          meaningVi: 'đồng phục',
          exampleEn: 'Students must wear their school uniform on Mondays.',
          exampleVi: 'Học sinh phải mặc đồng phục vào thứ Hai.',
          topic: 'School things',
          grade: 6,
          unit: 1
        },
        {
          id: 'v6-3',
          word: 'boarding school',
          ipa: '/ˈbɔːdɪŋ skuːl/',
          partOfSpeech: 'noun',
          meaningVi: 'trường nội trú',
          exampleEn: 'An studies at a famous boarding school in Da Lat.',
          exampleVi: 'An học tại một trường nội trú nổi tiếng ở Đà Lạt.',
          topic: 'School types',
          grade: 6,
          unit: 1
        },
        {
          id: 'v6-4',
          word: 'compass',
          ipa: '/ˈkʌmpəs/',
          partOfSpeech: 'noun',
          meaningVi: 'com-pa, la bàn',
          exampleEn: 'Draw a circle with your compass.',
          exampleVi: 'Hãy vẽ một hình tròn bằng com-pa của bạn.',
          topic: 'School things',
          grade: 6,
          unit: 1
        },
        {
          id: 'v6-5',
          word: 'classmate',
          ipa: '/ˈklɑːsmeɪt/',
          partOfSpeech: 'noun',
          meaningVi: 'bạn cùng lớp',
          exampleEn: 'My new classmates are very friendly and helpful.',
          exampleVi: 'Các bạn cùng lớp mới của tôi rất thân thiện và hay giúp đỡ.',
          topic: 'School life',
          grade: 6,
          unit: 1
        },
        {
          id: 'v6-6',
          word: 'pencil sharpener',
          ipa: '/ˈpensl ʃɑːpnər/',
          partOfSpeech: 'noun',
          meaningVi: 'cái gọt bút chì',
          exampleEn: 'Can I borrow your pencil sharpener?',
          exampleVi: 'Mình có thể mượn cái gọt bút chì của bạn không?',
          topic: 'School things',
          grade: 6,
          unit: 1
        },
        {
          id: 'v6-7',
          word: 'judo',
          ipa: '/ˈdʒuːdəʊ/',
          partOfSpeech: 'noun',
          meaningVi: 'môn võ judo',
          exampleEn: 'Duy does judo twice a week at the school gym.',
          exampleVi: 'Duy tập judo hai lần mỗi tuần tại phòng thể chất của trường.',
          topic: 'School activities',
          grade: 6,
          unit: 1
        },
        {
          id: 'v6-8',
          word: 'creative',
          ipa: '/kriˈeɪtɪv/',
          partOfSpeech: 'adjective',
          meaningVi: 'sáng tạo',
          exampleEn: 'Our art teacher is very creative.',
          exampleVi: 'Giáo viên mỹ thuật của chúng tôi rất sáng tạo.',
          topic: 'Personality',
          grade: 6,
          unit: 1
        }
      ],
      grammar: {
        id: 'g6-1',
        title: 'Present Simple vs. Present Continuous (Hiện tại đơn & Hiện tại tiếp diễn)',
        grade: 6,
        unit: 1,
        formula: 'HTĐ: S + V(s/es) / S + don\'t/doesn\'t + V_inf\nHTTD: S + am/is/are + V-ing',
        usageVi: 'Thì Hiện tại đơn diễn tả thói quen, chân lý sự thật hiển nhiên. Thì Hiện tại tiếp diễn diễn tả hành động đang xảy ra tại thời điểm nói hoặc xung quanh thời điểm nói.',
        signalsVi: [
          'HTĐ: always, usually, often, sometimes, rarely, never, every day/week...',
          'HTTD: now, at the moment, at present, look!, listen!, be quiet!'
        ],
        examples: [
          { en: 'Phong usually rides his bicycle to school.', vi: 'Phong thường đi xe đạp đến trường.' },
          { en: 'Look! The students are playing football in the playground.', vi: 'Nhìn kìa! Các học sinh đang chơi bóng đá trong sân trường.' }
        ],
        commonMistakesVi: [
          'Quên thêm "s" hoặc "es" vào sau động từ ở ngôi thứ 3 số ít (He, She, It) trong thì Hiện tại đơn.',
          'Quên động từ to be (am/is/are) trước V-ing trong thì Hiện tại tiếp diễn (VD: "They playing" là SAI, phải là "They are playing").',
          'Dùng động từ trạng thái cảm xúc (like, love, know, understand) ở thì tiếp diễn (không dùng "I am knowing").'
        ],
        practiceQuestions: [
          {
            id: 'gp6-1',
            prompt: 'Listen! Someone ______ at the classroom door.',
            type: 'mcq',
            options: ['knocks', 'is knocking', 'knock', 'are knocking'],
            correctAnswer: 1,
            explanationVi: 'Dấu hiệu "Listen!" (Nghe kìa!) là dấu hiệu nhận biết của thì Hiện tại tiếp diễn. Chủ ngữ "Someone" là đại từ bất định số ít nên dùng "is knocking".',
            category: 'Grammar'
          },
          {
            id: 'gp6-2',
            prompt: 'My brother usually ______ his homework after dinner.',
            type: 'mcq',
            options: ['do', 'does', 'is doing', 'doing'],
            correctAnswer: 1,
            explanationVi: 'Trạng từ tần suất "usually" chỉ thói quen lặp đi lặp lại => thì Hiện tại đơn. Chủ ngữ "My brother" (ngôi thứ ba số ít) nên chia động từ là "does".',
            category: 'Grammar'
          }
        ]
      },
      listening: {
        id: 'l6-1',
        title: 'Conversation: An\'s First Day at Sunrise School',
        difficulty: 'Easy',
        grade: 6,
        unit: 1,
        audioPrompt: 'Welcome to Sunrise Boarding School. My name is An. Today is my first day here. The school has a modern library, a big swimming pool, and twenty classrooms. We always wear our white uniform in the morning. After classes, my friends and I usually play badminton or do judo in the sports hall. I love my new school very much because the teachers are friendly and caring.',
        sentences: [
          { id: 1, text: 'Welcome to Sunrise Boarding School.', translationVi: 'Chào mừng các bạn đến với Trường Nội trú Sunrise.', timestamp: '0:00' },
          { id: 2, text: 'My name is An and today is my first day here.', translationVi: 'Tên mình là An và hôm nay là ngày đầu tiên của mình ở đây.', timestamp: '0:03' },
          { id: 3, text: 'The school has a modern library, a big swimming pool, and twenty classrooms.', translationVi: 'Trường có một thư viện hiện đại, một bể bơi lớn và 20 phòng học.', timestamp: '0:07' },
          { id: 4, text: 'We always wear our white uniform in the morning.', translationVi: 'Chúng mình luôn mặc đồng phục trắng vào buổi sáng.', timestamp: '0:13' },
          { id: 5, text: 'After classes, my friends and I usually play badminton or do judo.', translationVi: 'Sau giờ học, mình và các bạn thường chơi cầu lông hoặc tập judo.', timestamp: '0:17' },
          { id: 6, text: 'I love my new school very much because the teachers are friendly and caring.', translationVi: 'Mình rất yêu ngôi trường mới vì các thầy cô thân thiện và chu đáo.', timestamp: '0:22' }
        ],
        transcriptVi: 'Chào mừng các bạn đến với Trường Nội trú Sunrise. Tên mình là An. Hôm nay là ngày đầu tiên của mình ở đây. Ngôi trường có một thư viện hiện đại, bể bơi lớn và 20 phòng học. Chúng mình luôn mặc đồng phục trắng vào buổi sáng. Sau giờ học, mình và các bạn thường chơi cầu lông hoặc tập võ judo ở nhà thể chất. Mình rất yêu trường mới vì các thầy cô rất thân thiện và chu đáo.',
        keywords: [
          { word: 'boarding school', ipa: '/ˈbɔːdɪŋ skuːl/', meaningVi: 'trường nội trú' },
          { word: 'uniform', ipa: '/ˈjuːnɪfɔːm/', meaningVi: 'đồng phục' },
          { word: 'friendly', ipa: '/ˈfrendli/', meaningVi: 'thân thiện' }
        ],
        questions: [
          {
            id: 'lq6-1',
            prompt: 'What kind of school does An study at?',
            type: 'mcq',
            options: ['A day school in the city', 'A boarding school', 'A private art school', 'A music academy'],
            correctAnswer: 1,
            explanationVi: 'Trong bài nghe có câu: "Welcome to Sunrise Boarding School." => Trường nội trú (boarding school).',
            category: 'Listening'
          },
          {
            id: 'lq6-2',
            prompt: 'Students wear their white uniform in the morning.',
            type: 'true_false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanationVi: 'Trong bài nghe có câu: "We always wear our white uniform in the morning." => Đúng (True).',
            category: 'Listening'
          },
          {
            id: 'lq6-3',
            prompt: 'Which martial art do An and his friends do after classes?',
            type: 'mcq',
            options: ['Karate', 'Taekwondo', 'Judo', 'Kung fu'],
            correctAnswer: 2,
            explanationVi: 'Trong bài nghe có câu: "...usually play badminton or do judo..." => Môn võ judo.',
            category: 'Listening'
          },
          {
            id: 'lq6-4',
            prompt: 'How many classrooms does Sunrise School have?',
            type: 'mcq',
            options: ['Twelve', 'Fifteen', 'Twenty', 'Twenty-five'],
            correctAnswer: 2,
            explanationVi: 'Trong bài nghe có câu: "...and twenty classrooms." => 20 phòng học.',
            category: 'Listening'
          },
          {
            id: 'lq6-5',
            prompt: 'Why does An love his new school?',
            type: 'mcq',
            options: ['Because it is close to his house', 'Because the teachers are friendly and caring', 'Because there is no homework', 'Because he only studies art'],
            correctAnswer: 1,
            explanationVi: 'Dẫn chứng: "I love my new school very much because the teachers are friendly and caring."',
            category: 'Listening'
          },
          {
            id: 'lq6-6',
            prompt: 'Where do students play badminton or do judo?',
            type: 'mcq',
            options: ['In the playground', 'In the sports hall', 'In the canteen', 'In the library'],
            correctAnswer: 1,
            explanationVi: 'Dẫn chứng: "...in the sports hall." (trong nhà thể chất của trường).',
            category: 'Listening'
          }
        ]
      },
      speaking: {
        id: 's6-1',
        title: 'Pronunciation /ɑː/ and /ʌ/ & Daily School Talk',
        grade: 6,
        unit: 1,
        targetSentence: 'My classmates and I usually study in the school library.',
        ipa: '/maɪ ˈklɑːsmeɪts ænd aɪ ˈjuːʒuəli ˈstʌdi ɪn ðə skuːl ˈlaɪbrəri/',
        stressGuide: 'Nhấn trọng âm vào: CLASS-mates, U-sual-ly, STU-dy, LI-bra-ry.',
        meaningVi: 'Các bạn cùng lớp và tôi thường học bài trong thư viện trường.',
        samplePrompt: 'Hãy đọc to câu nói trên với ngữ điệu tự nhiên, chú ý âm đuôi /ts/ trong "classmates" và trọng âm của từ "library".',
        topic: 'School',
        items: [
          {
            id: 'sp6-1',
            title: 'Luyện âm /ɑː/ và /ʌ/',
            targetSentence: 'My classmates and I usually study in the school library.',
            ipa: '/maɪ ˈklɑːsmeɪts ænd aɪ ˈjuːʒuəli ˈstʌdi ɪn ðə skuːl ˈlaɪbrəri/',
            stressGuide: 'CLASS-mates, U-sual-ly, STU-dy, LI-bra-ry.',
            meaningVi: 'Các bạn cùng lớp và tôi thường học bài trong thư viện trường.',
            topic: 'School'
          },
          {
            id: 'sp6-2',
            title: 'Mô tả hoạt động thể chất',
            targetSentence: 'Duy does judo with his best friend every Tuesday afternoon.',
            ipa: '/duːi dʌz ˈdʒuːdəʊ wɪð hɪz best frend ˈevri ˈtjuːzdeɪ ˌɑːftəˈnuːn/',
            stressGuide: 'DOES, JU-do, BEST FRIEND, TUES-day, af-ter-NOON.',
            meaningVi: 'Duy tập judo cùng bạn thân vào mỗi chiều thứ Ba.',
            topic: 'Sports'
          },
          {
            id: 'sp6-3',
            title: 'Giới thiệu đồng phục trường',
            targetSentence: 'We always wear our smart uniform on Monday mornings.',
            ipa: '/wiː ˈɔːlweɪz weər ˈaʊər smɑːt ˈjuːnɪfɔːm ɒn ˈmʌndeɪ ˈmɔːnɪŋz/',
            stressGuide: 'AL-ways, WEAR, SMART, U-ni-form, MON-day.',
            meaningVi: 'Chúng mình luôn mặc đồng phục chỉnh tề vào sáng thứ Hai.',
            topic: 'School Uniform'
          },
          {
            id: 'sp6-4',
            title: 'Dụng cụ học tập',
            targetSentence: 'Can I borrow your compass and calculator for math class?',
            ipa: '/kæn aɪ ˈbɒrəʊ jɔːr ˈkʌmpəs ænd ˈkælkjuleɪtər fɔːr mæθ klɑːs/',
            stressGuide: 'BOR-row, COM-pass, CAL-cu-la-tor, MATH CLASS.',
            meaningVi: 'Mình có thể mượn com-pa và máy tính của bạn cho tiết toán không?',
            topic: 'School Things'
          },
          {
            id: 'sp6-5',
            title: 'Hỏi đáp về giờ ra chơi',
            targetSentence: 'What do you usually do during break time at school?',
            ipa: '/wɒt duː juː ˈjuːʒuəli duː ˈdjʊərɪŋ breɪk taɪm æt skuːl/',
            stressGuide: 'U-sual-ly, BREAK TIME, SCHOOL.',
            meaningVi: 'Bạn thường làm gì vào giờ ra chơi ở trường?',
            topic: 'Break Time'
          },
          {
            id: 'sp6-6',
            title: 'Cảm nghĩ về thầy cô',
            targetSentence: 'Our new teachers are very enthusiastic, friendly and helpful.',
            ipa: '/ˈaʊər njuː ˈtiːtʃərz ɑːr ˈveri ɪnˌθjuːziˈæstɪk ˈfrendli ænd ˈhelpfl/',
            stressGuide: 'TEA-chers, en-thu-si-AS-tic, FRIEND-ly, HELP-ful.',
            meaningVi: 'Các thầy cô mới của chúng tôi rất nhiệt tình, thân thiện và hay giúp đỡ.',
            topic: 'Teachers'
          }          ,
          {
            id: 'sp6-7',
            title: 'Hỏi bài tập về nhà',
            targetSentence: 'Do we have any English homework for tomorrow morning?',
            ipa: '/duː wiː hæv ˈeni ˈɪŋɡlɪʃ ˈhəʊmwɜːk fɔːr təˈmɒrəʊ ˈmɔːnɪŋ/',
            stressGuide: 'ENG-lish, HOME-work, to-MOR-row, MORN-ing.',
            meaningVi: 'Chúng mình có bài tập tiếng Anh nào cho sáng mai không?',
            topic: 'School'
          },
          {
            id: 'sp6-8',
            title: 'Môn học yêu thích nhất',
            targetSentence: 'My favourite subject is Science because I love doing interesting experiments.',
            ipa: '/maɪ ˈfeɪvərɪt ˈsʌbdʒɪkt ɪz ˈsaɪəns bɪˈkɒz aɪ lʌv ˈduːɪŋ ˈɪntrəstɪŋ ɪkˈsperɪmənts/',
            stressGuide: 'FA-vou-rite, SUB-ject, SCI-ence, IN-ter-est-ing, ex-PER-i-ments.',
            meaningVi: 'Môn học yêu thích của tôi là Khoa học vì tôi rất thích làm những thí nghiệm thú vị.',
            topic: 'School'
          }
        ],
        suggestedAnswers: [
          'My classmates and I usually study in the school library.',
          'I like doing judo with my friends after school.'
        ]
      },
      reading: {
        id: 'r6-1',
        title: 'A Green School in the Countryside',
        grade: 6,
        unit: 1,
        wordCount: 165,
        topic: 'School environment',
        passage: 'Greenfield Lower Secondary School is located in a peaceful village. There are about 400 students and 30 teachers. The school has fifteen spacious classrooms, a science lab, and a large computer room with internet access. Outside, there is a green school garden where students plant vegetables and flowers during biology lessons. Every Wednesday afternoon, students take part in sports clubs such as basketball, table tennis, and badminton. Students at Greenfield wear dark blue uniforms with a small logo on the chest. The teachers are very enthusiastic and always help students with difficult exercises. Most students cycle to school every morning because the roads are quiet and safe. Everyone is proud of their clean and friendly school.',
        translationVi: 'Trường THCS Greenfield nằm tại một ngôi làng thanh bình. Có khoảng 400 học sinh và 30 giáo viên. Trường có 15 phòng học rộng rãi, một phòng thí nghiệm khoa học và một phòng máy tính lớn có kết nối mạng. Bên ngoài có một khu vườn trường xanh mát nơi học sinh trồng rau và hoa trong các tiết học sinh học. Mỗi chiều thứ Tư, học sinh tham gia các câu lạc bộ thể thao như bóng rổ, bóng bàn và cầu lông. Học sinh trường Greenfield mặc đồng phục màu xanh thẫm có logo nhỏ trước ngực. Các thầy cô rất nhiệt tình và luôn giúp đỡ học sinh làm bài tập khó. Hầu hết học sinh đạp xe đến trường mỗi sáng vì đường xá yên tĩnh và an toàn. Mọi người đều tự hào về ngôi trường sạch đẹp và thân thiện của mình.',
        vocabularyHighlights: [
          { word: 'spacious', ipa: '/ˈspeɪʃəs/', meaningVi: 'rộng rãi, thoáng mát' },
          { word: 'enthusiastic', ipa: '/ɪnˌθjuːziˈæstɪk/', meaningVi: 'nhiệt tình, hăng hái' },
          { word: 'biology', ipa: '/baɪˈɒlədʒi/', meaningVi: 'môn sinh học' }
        ],
        questions: [
          {
            id: 'rq6-1',
            prompt: 'Where is Greenfield Lower Secondary School located?',
            type: 'mcq',
            options: ['In the city center', 'In a peaceful village', 'On a high mountain', 'Near an airport'],
            correctAnswer: 1,
            explanationVi: 'Dẫn chứng trong đoạn 1: "Greenfield Lower Secondary School is located in a peaceful village."',
            passageEvidence: 'located in a peaceful village',
            category: 'Reading'
          },
          {
            id: 'rq6-2',
            prompt: 'What do students plant in the school garden?',
            type: 'mcq',
            options: ['Fruit trees and rice', 'Vegetables and flowers', 'Tea and coffee', 'Grass and roses only'],
            correctAnswer: 1,
            explanationVi: 'Dẫn chứng: "...where students plant vegetables and flowers during biology lessons."',
            passageEvidence: 'students plant vegetables and flowers',
            category: 'Reading'
          },
          {
            id: 'rq6-3',
            prompt: 'How do most students travel to Greenfield School?',
            type: 'mcq',
            options: ['By school bus', 'By motorbike', 'By bicycle', 'On foot'],
            correctAnswer: 2,
            explanationVi: 'Dẫn chứng: "Most students cycle to school every morning" => cycle = đi xe đạp (by bicycle).',
            passageEvidence: 'Most students cycle to school',
            category: 'Reading'
          },
          {
            id: 'rq6-4',
            prompt: 'How many teachers are there at Greenfield School?',
            type: 'mcq',
            options: ['15 teachers', '20 teachers', '30 teachers', '40 teachers'],
            correctAnswer: 2,
            explanationVi: 'Dẫn chứng: "...about 400 students and 30 teachers." => 30 giáo viên.',
            passageEvidence: 'about 400 students and 30 teachers',
            category: 'Reading'
          },
          {
            id: 'rq6-5',
            prompt: 'What color is the school uniform at Greenfield?',
            type: 'mcq',
            options: ['White and red', 'Dark blue', 'Yellow and green', 'Black and grey'],
            correctAnswer: 1,
            explanationVi: 'Dẫn chứng: "Students at Greenfield wear dark blue uniforms with a small logo on the chest."',
            passageEvidence: 'wear dark blue uniforms',
            category: 'Reading'
          },
          {
            id: 'rq6-6',
            prompt: 'When do students participate in sports clubs?',
            type: 'mcq',
            options: ['Every Monday morning', 'Every Wednesday afternoon', 'On Saturday nights', 'During lunchtime every day'],
            correctAnswer: 1,
            explanationVi: 'Dẫn chứng: "Every Wednesday afternoon, students take part in sports clubs such as basketball, table tennis, and badminton."',
            passageEvidence: 'Every Wednesday afternoon, students take part in sports clubs',
            category: 'Reading'
          }
        ,
          {
            id: 'rq6-7',
            prompt: 'The computer room at Greenfield School has no internet access.',
            type: 'true_false',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanationVi: 'Dẫn chứng: "...and a large computer room with internet access." => False.',
            passageEvidence: 'computer room with internet access',
            category: 'Reading'
          },
          {
            id: 'rq6-8',
            prompt: 'Why are students proud of Greenfield Lower Secondary School?',
            type: 'mcq',
            options: [
              'Because it is clean and friendly',
              'Because it is the biggest school in Vietnam',
              'Because they do not have examinations',
              'Because students do not need to study'
            ],
            correctAnswer: 0,
            explanationVi: 'Dẫn chứng: "Everyone is proud of their clean and friendly school."',
            passageEvidence: 'proud of their clean and friendly school',
            category: 'Reading'
          },]
      },
      writing: {
        id: 'w6-1',
        title: 'Describe Your New School',
        grade: 6,
        unit: 1,
        topicPrompt: 'Write a short paragraph (50 - 70 words) about your school. Mention its name, location, facilities, and why you like it.',
        minWords: 45,
        maxWords: 80,
        outlineVi: [
          'Câu mở đoạn: Giới thiệu tên trường và vị trí (My school is... It is in...).',
          'Thân đoạn 1: Cơ sở vật chất (It has... classrooms, a library, a playground...).',
          'Thân đoạn 2: Hoạt động và đồng phục (We wear... We study/play...).',
          'Câu kết đoạn: Cảm nghĩ của em về ngôi trường (I love my school because...).'
        ],
        suggestedPhrases: [
          { phrase: 'is located in / is in', meaningVi: 'nằm ở / toạ lạc tại' },
          { phrase: 'has ... modern classrooms', meaningVi: 'có ... phòng học hiện đại' },
          { phrase: 'friendly teachers and classmates', meaningVi: 'thầy cô và bạn bè thân thiện' },
          { phrase: 'I really love my school because...', meaningVi: 'Tôi thật sự yêu trường tôi vì...' }
        ],
        sampleEssay: 'My new school is Quang Trung Lower Secondary School. It is located in a quiet street in Hanoi. The school has twenty modern classrooms, a big library, and a beautiful green garden. My teachers are very helpful and kind. Every day, I study interesting subjects and play sports with my classmates. I love my school very much because it is like my second home.',
        practiceTasks: [
          {
            id: 'wt6-1',
            type: 'sentence_reorder',
            prompt: 'Sắp xếp lại các từ sau thành câu hoàn chỉnh: "school / my / twenty / has / classrooms / new / modern ."',
            guideVi: 'Chủ ngữ + has + số lượng + tính từ + danh từ.',
            sampleAnswer: 'My new school has twenty modern classrooms.'
          },
          {
            id: 'wt6-2',
            type: 'sentence_transformation',
            prompt: 'Viết lại câu sau sử dụng cấu trúc "There are": "Our school has 400 students and 30 teachers."',
            guideVi: 'There are + số lượng + in our school.',
            sampleAnswer: 'There are 400 students and 30 teachers in our school.'
          },
          {
            id: 'wt6-3',
            type: 'error_correction',
            prompt: 'Tìm và sửa 1 lỗi sai trong câu: "Look! The boys is playing soccer in the playground."',
            guideVi: 'Chủ ngữ số nhiều "The boys" cần đi với to be "are".',
            sampleAnswer: 'Look! The boys are playing soccer in the playground.'
          },
          {
            id: 'wt6-4',
            type: 'sentence_combine',
            prompt: 'Nối 2 câu sau bằng liên từ "because": "I love my new school. The teachers are very friendly and kind."',
            guideVi: 'Nối hai mệnh đề chỉ nguyên nhân.',
            sampleAnswer: 'I love my new school because the teachers are very friendly and kind.'
          },
          {
            id: 'wt6-5',
            type: 'sentence_transformation',
            prompt: 'Chia động từ trong ngoặc: "Phong usually (ride) ______ his bike to school, but today he (walk) ______."',
            guideVi: 'Vế 1 thì Hiện tại đơn (thói quen), vế 2 thì Hiện tại tiếp diễn (hành động hôm nay).',
            sampleAnswer: 'Phong usually rides his bike to school, but today he is walking.'
          }
        ,
          {
            id: 'wt6-6',
            type: 'sentence_transformation',
            prompt: 'Viết lại câu phủ định thì Hiện tại đơn: "She plays badminton after school." -> "She ______."',
            guideVi: 'Dùng trợ động từ "doesn\'t" + động từ nguyên thể "play".',
            sampleAnswer: "She doesn't play badminton after school."
          },
          {
            id: 'wt6-7',
            type: 'sentence_reorder',
            prompt: 'Sắp xếp lại: "wear / students / uniforms / school / on / Mondays ."',
            guideVi: 'Chủ ngữ + động từ + tân ngữ + trạng ngữ chỉ thời gian.',
            sampleAnswer: 'Students wear school uniforms on Mondays.'
          },
          {
            id: 'wt6-8',
            type: 'sentence_combine',
            prompt: 'Nối câu bằng liên từ "and": "The school has a modern library. It has a big swimming pool."',
            guideVi: 'Dùng "and" để nối hai cơ sở vật chất.',
            sampleAnswer: 'The school has a modern library and a big swimming pool.'
          },]
      },
      quizQuestions: [
        {
          id: 'qz6-1',
          prompt: 'Choose the word whose underlined part is pronounced differently: /ɑː/ vs /ʌ/',
          type: 'mcq',
          options: ['f<u>a</u>ther', 'cl<u>a</u>ss', 'st<u>u</u>dy', 'f<u>a</u>st'],
          correctAnswer: 2,
          explanationVi: 'Từ "study" có phần gạch chân phát âm là /ʌ/, trong khi "father", "class", "fast" phát âm là /ɑː/.',
          category: 'Pronunciation'
        },
        {
          id: 'qz6-2',
          prompt: 'Look! The students ______ badminton in the schoolyard.',
          type: 'mcq',
          options: ['play', 'is playing', 'are playing', 'plays'],
          correctAnswer: 2,
          explanationVi: 'Dấu hiệu "Look!" => thì Hiện tại tiếp diễn. Chủ ngữ "The students" là danh từ số nhiều nên dùng "are playing".',
          category: 'Grammar'
        },
        {
          id: 'qz6-3',
          prompt: 'She always ______ her school bag before going to bed.',
          type: 'mcq',
          options: ['packs', 'pack', 'is packing', 'packing'],
          correctAnswer: 0,
          explanationVi: 'Trạng từ "always" chỉ thói quen thường xuyên => Hiện tại đơn. Chủ ngữ "She" (ngôi 3 số ít) => "packs".',
          category: 'Grammar'
        },
        {
          id: 'qz6-4',
          prompt: 'You need a ______ to draw a neat circle in geometry.',
          type: 'mcq',
          options: ['calculator', 'compass', 'pencil case', 'rubber'],
          correctAnswer: 1,
          explanationVi: '"compass" nghĩa là com-pa, dùng để vẽ đường tròn.',
          category: 'Vocabulary'
        },
        {
          id: 'qz6-5',
          prompt: 'At lunchtime, students eat in the school ______.',
          type: 'mcq',
          options: ['canteen', 'library', 'laboratory', 'gymnasium'],
          correctAnswer: 0,
          explanationVi: '"canteen" nghĩa là nhà ăn / căng tin của trường học.',
          category: 'Vocabulary'
        },
        {
          id: 'qz6-6',
          prompt: 'My brother usually ______ judo twice a week at the community center.',
          type: 'mcq',
          options: ['plays', 'does', 'makes', 'takes'],
          correctAnswer: 1,
          explanationVi: 'Với võ thuật (judo, karate), ta dùng động từ "do" => "does judo".',
          category: 'Vocabulary'
        },
        {
          id: 'qz6-7',
          prompt: 'Which word has the main stress on the first syllable?',
          type: 'mcq',
          options: ['uniform', 'excited', 'between', 'around'],
          correctAnswer: 0,
          explanationVi: '"uniform" /ˈjuːnɪfɔːm/ có trọng âm 1, các từ còn lại có trọng âm 2.',
          category: 'Pronunciation'
        },
        {
          id: 'qz6-8',
          prompt: 'They ______ in the classroom at the moment; they are having lunch in the canteen.',
          type: 'mcq',
          options: ['don\'t study', 'aren\'t studying', 'isn\'t studying', 'not study'],
          correctAnswer: 1,
          explanationVi: 'Dấu hiệu "at the moment" => Hiện tại tiếp diễn phủ định số nhiều: "aren\'t studying".',
          category: 'Grammar'
        }        ,
        {
          id: 'qz6-9',
          prompt: 'Look! The girls ______ ropes in the school playground.',
          type: 'mcq',
          options: ['skip', 'are skipping', 'is skipping', 'skips'],
          correctAnswer: 1,
          explanationVi: 'Dấu hiệu "Look!" => Hiện tại tiếp diễn số nhiều: "are skipping".',
          category: 'Grammar'
        },
        {
          id: 'qz6-10',
          prompt: 'We always wear our school ______ on Monday morning assembly.',
          type: 'mcq',
          options: ['uniform', 'compass', 'calculator', 'pencil sharpener'],
          correctAnswer: 0,
          explanationVi: '"school uniform" nghĩa là đồng phục học sinh.',
          category: 'Vocabulary'
        }
      ]
    }
  ],

  // LỚP 7
  7: [
    {
      unitNumber: 1,
      title: 'Unit 1: Hobbies',
      descriptionVi: 'Khám phá các sở thích thú vị, động từ chỉ sự yêu thích (like, love, enjoy + V-ing) và lợi ích của sở thích.',
      grade: 7,
      vocabularies: [
        {
          id: 'v7-1',
          word: 'gardening',
          ipa: '/ˈɡɑːdnɪŋ/',
          partOfSpeech: 'noun',
          meaningVi: 'làm vườn',
          exampleEn: 'My grandmother enjoys gardening on weekends.',
          exampleVi: 'Bà tôi thích làm vườn vào dịp cuối tuần.',
          topic: 'Hobbies',
          grade: 7,
          unit: 1
        },
        {
          id: 'v7-2',
          word: 'collecting coins',
          ipa: '/kəˈlektɪŋ kɔɪnz/',
          partOfSpeech: 'phrase',
          meaningVi: 'sưu tầm đồng xu',
          exampleEn: 'His hobby is collecting coins from different countries.',
          exampleVi: 'Sở thích của anh ấy là sưu tầm đồng xu từ các nước khác nhau.',
          topic: 'Hobbies',
          grade: 7,
          unit: 1
        },
        {
          id: 'v7-3',
          word: 'origami',
          ipa: '/ˌɒrɪˈɡɑːmi/',
          partOfSpeech: 'noun',
          meaningVi: 'nghệ thuật gấp giấy Nhật Bản',
          exampleEn: 'Making origami models requires patience and care.',
          exampleVi: 'Gấp giấy origami đòi hỏi sự kiên nhẫn và cẩn thận.',
          topic: 'Hobbies',
          grade: 7,
          unit: 1
        },
        {
          id: 'v7-4',
          word: 'patience',
          ipa: '/ˈpeɪʃns/',
          partOfSpeech: 'noun',
          meaningVi: 'lòng kiên nhẫn',
          exampleEn: 'You need a lot of patience to learn oil painting.',
          exampleVi: 'Bạn cần rất nhiều sự kiên nhẫn để học vẽ tranh sơn dầu.',
          topic: 'Skills & Traits',
          grade: 7,
          unit: 1
        },
        {
          id: 'v7-5',
          word: 'take up',
          ipa: '/teɪk ʌp/',
          partOfSpeech: 'phrasal verb',
          meaningVi: 'bắt đầu một sở thích mới',
          exampleEn: 'I decided to take up swimming this summer.',
          exampleVi: 'Tôi quyết định bắt đầu học bơi vào mùa hè này.',
          topic: 'Hobbies',
          grade: 7,
          unit: 1
        },
        {
          id: 'v7-6',
          word: 'beneficial',
          ipa: '/ˌbenɪˈfɪʃl/',
          partOfSpeech: 'adjective',
          meaningVi: 'có ích, mang lại lợi ích',
          exampleEn: 'Reading books is beneficial for your brain.',
          exampleVi: 'Đọc sách rất có lợi cho trí não của bạn.',
          topic: 'Benefits',
          grade: 7,
          unit: 1
        }
      ],
      grammar: {
        id: 'g7-1',
        title: 'Verbs of Liking / Disliking + Gerund (Động từ chỉ sở thích + V-ing)',
        grade: 7,
        unit: 1,
        formula: 'S + like / love / enjoy / prefer / hate / dislike + V-ing',
        usageVi: 'Dùng để diễn tả sở thích hoặc sự không thích một hành động nào đó.',
        signalsVi: [
          'like, love, adore, enjoy, fancy (+ V-ing): thích, yêu thích',
          'dislike, hate, detest (+ V-ing): ghét, không thích'
        ],
        examples: [
          { en: 'Lan loves making handmade dolls from recycled cloth.', vi: 'Lan thích làm búp bê thủ công từ vải tái chế.' },
          { en: 'My brother hates waking up early on Sundays.', vi: 'Anh trai tôi ghét phải thức dậy sớm vào sáng Chủ nhật.' }
        ],
        commonMistakesVi: [
          'Dùng động từ nguyên mẫu không có "to" sau like/enjoy (VD: "I like play chess" là SAI, phải là "I like playing chess").',
          'Chia sai động từ chính theo ngôi thứ ba số ít (VD: "He enjoy reading" là SAI, phải là "He enjoys reading").'
        ],
        practiceQuestions: [
          {
            id: 'gp7-1',
            prompt: 'My cousin really enjoys ______ pictures of countryside landscapes.',
            type: 'mcq',
            options: ['paint', 'to paint', 'painting', 'painted'],
            correctAnswer: 2,
            explanationVi: 'Sau động từ chỉ sở thích "enjoy", ta sử dụng danh động từ (V-ing) => "painting".',
            category: 'Grammar'
          },
          {
            id: 'gp7-2',
            prompt: 'Tom ______ spending hours building plastic airplane models.',
            type: 'mcq',
            options: ['likes', 'like', 'is like', 'liking'],
            correctAnswer: 0,
            explanationVi: 'Chủ ngữ "Tom" là ngôi thứ ba số ít, diễn tả sở thích chung => "likes".',
            category: 'Grammar'
          }
        ]
      },
      listening: {
        id: 'l7-1',
        title: 'Podcast: Unusual Hobbies of Teenagers',
        difficulty: 'Medium',
        grade: 7,
        unit: 1,
        audioPrompt: 'Hello everyone! Welcome to Teen Voice. Today we are talking about unique hobbies. While many students love playing video games or listening to music, Minh has an unusual hobby: carving eggshells. Minh started this hobby two years ago after watching a video on YouTube. He says carving eggshells requires extraordinary patience and gentle hands. It often takes him three days to complete one carved eggshell with delicate floral patterns. Minh loves giving his finished artwork as birthday gifts to his friends.',
        sentences: [
          { id: 1, text: 'Hello everyone and welcome to Teen Voice.', translationVi: 'Xin chào mọi người và chào mừng đến với Teen Voice.', timestamp: '0:00' },
          { id: 2, text: 'Today we are talking about unique hobbies.', translationVi: 'Hôm nay chúng ta nói về những sở thích độc đáo.', timestamp: '0:03' },
          { id: 3, text: 'Minh has an unusual hobby: carving eggshells.', translationVi: 'Minh có một sở thích đặc biệt: khắc vỏ trứng.', timestamp: '0:06' },
          { id: 4, text: 'Minh started this hobby two years ago after watching a video on YouTube.', translationVi: 'Minh bắt đầu sở thích này 2 năm trước sau khi xem một video trên YouTube.', timestamp: '0:10' },
          { id: 5, text: 'It often takes him three days to complete one carved eggshell.', translationVi: 'Anh ấy thường mất 3 ngày để hoàn thành một vỏ trứng khắc.', timestamp: '0:16' }
        ],
        transcriptVi: 'Xin chào mọi người! Chào mừng các bạn đến với Teen Voice. Hôm nay chúng ta cùng trò chuyện về những sở thích độc đáo. Trong khi nhiều bạn thích chơi game hoặc nghe nhạc, bạn Minh lại có một sở thích rất lạ: chạm khắc vỏ trứng. Minh bắt đầu sở thích này 2 năm trước sau khi xem video trên YouTube. Cậu ấy chia sẻ rằng môn nghệ thuật này đòi hỏi sự kiên nhẫn phi thường và bàn tay khéo léo. Cậu thường mất khoảng 3 ngày để hoàn thành một tác phẩm vỏ trứng với hoa văn tinh xảo.',
        keywords: [
          { word: 'carving eggshells', ipa: '/ˈkɑːvɪŋ ˈeɡʃelz/', meaningVi: 'chạm khắc vỏ trứng' },
          { word: 'unusual', ipa: '/ʌnˈjuːʒuəl/', meaningVi: 'độc đáo, khác thường' },
          { word: 'patience', ipa: '/ˈpeɪʃns/', meaningVi: 'sự kiên nhẫn' }
        ],
        questions: [
          {
            id: 'lq7-1',
            prompt: 'What is Minh\'s unique hobby?',
            type: 'mcq',
            options: ['Collecting vintage stamps', 'Carving eggshells', 'Playing the piano', 'Taking landscape photos'],
            correctAnswer: 1,
            explanationVi: 'Trong bài nghe: "Minh has an unusual hobby: carving eggshells."',
            category: 'Listening'
          },
          {
            id: 'lq6-7',
            prompt: 'Which sentence is TRUE about Sunrise Boarding School?',
            type: 'mcq',
            options: [
              'Students never wear uniforms in the morning.',
              'The school only has ten classrooms.',
              'The school has a modern library and a swimming pool.',
              'Students go home immediately after class.'
            ],
            correctAnswer: 2,
            explanationVi: 'Dẫn chứng trong bài nghe: "The school has a modern library, a big swimming pool, and twenty classrooms."',
            category: 'Listening'
          },
          {
            id: 'lq6-8',
            prompt: 'An does judo and plays badminton after classes.',
            type: 'true_false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanationVi: 'Dẫn chứng: "After classes, my friends and I usually play badminton or do judo in the sports hall." => True.',
            category: 'Listening'
          },
          {
            id: 'lq7-2',
            prompt: 'How long does it usually take Minh to finish one carved eggshell?',
            type: 'mcq',
            options: ['Three hours', 'One week', 'Three days', 'Two months'],
            correctAnswer: 2,
            explanationVi: 'Trong bài nghe: "It often takes him three days to complete one carved eggshell."',
            category: 'Listening'
          },
          {
            id: 'lq7-3',
            prompt: 'When did Minh start carving eggshells?',
            type: 'mcq',
            options: ['Last week', 'Two years ago', 'Five years ago', 'During summer camp'],
            correctAnswer: 1,
            explanationVi: 'Trong bài nghe: "Minh started this hobby two years ago after watching a video on YouTube."',
            category: 'Listening'
          },
          {
            id: 'lq7-4',
            prompt: 'What special quality does carving eggshells require according to Minh?',
            type: 'mcq',
            options: ['Expensive tools', 'Extraordinary patience and gentle hands', 'High physical strength', 'Teamwork with classmates'],
            correctAnswer: 1,
            explanationVi: 'Trong bài nghe: "...carving eggshells requires extraordinary patience and gentle hands."',
            category: 'Listening'
          },
          {
            id: 'lq7-5',
            prompt: 'What does Minh do with his finished carved eggshells?',
            type: 'mcq',
            options: ['He sells them at market', 'He gives them as birthday gifts to friends', 'He throws them away', 'He enters international art competitions'],
            correctAnswer: 1,
            explanationVi: 'Trong bài nghe: "Minh loves giving his finished artwork as birthday gifts to his friends."',
            category: 'Listening'
          },
          {
            id: 'lq7-6',
            prompt: 'What kind of patterns does Minh usually carve on the eggshells?',
            type: 'mcq',
            options: ['Delicate floral patterns', 'Animal cartoons only', 'Geometric squares', 'Names of famous cities'],
            correctAnswer: 0,
            explanationVi: 'Trong bài nghe: "...with delicate floral patterns" (hoa văn hoa lá tinh xảo).',
            category: 'Listening'
          }
        ,
          {
            id: 'lq7-7',
            prompt: 'Who taught Minh how to carve patterns on eggshells?',
            type: 'mcq',
            options: ['His grandfather', 'His art teacher at school', 'He learned by himself online', 'His elder brother'],
            correctAnswer: 0,
            explanationVi: 'Trong bài nghe: Minh được ông nội của mình truyền dạy bí quyết điêu khắc vỏ trứng.',
            category: 'Listening'
          },
          {
            id: 'lq7-8',
            prompt: 'Carving eggshells is an easy hobby that takes only five minutes.',
            type: 'true_false',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanationVi: 'Dẫn chứng: Điêu khắc vỏ trứng cần sự kiên nhẫn phi thường và nhiều giờ tỉ mỉ => False.',
            category: 'Listening'
          },]
      },
      speaking: {
        id: 's7-1',
        title: 'Talking About Your Favourite Hobby',
        grade: 7,
        unit: 1,
        targetSentence: 'My favourite hobby is making origami models in my free time.',
        ipa: '/maɪ ˈfeɪvərɪt ˈhɒbi ɪz ˈmeɪkɪŋ ˌɒrɪˈɡɑːmi ˈmɒdlz ɪn maɪ friː taɪm/',
        stressGuide: 'Nhấn trọng âm vào: FA-vou-rite, HOB-by, o-ri-GA-mi, MOD-els, FREE TIME.',
        meaningVi: 'Sở thích yêu thích của tôi là gấp các mô hình origami vào thời gian rảnh.',
        samplePrompt: 'Luyện tập phát âm câu trên, chú ý phát âm chuẩn từ "origami" (/ˌɒrɪˈɡɑːmi/) và nối âm mượt mà.',
        topic: 'Hobbies',
        items: [
          {
            id: 'sp7-1',
            title: 'Sở thích gấp giấy Origami',
            targetSentence: 'My favourite hobby is making origami models in my free time.',
            ipa: '/maɪ ˈfeɪvərɪt ˈhɒbi ɪz ˈmeɪkɪŋ ˌɒrɪˈɡɑːmi ˈmɒdlz ɪn maɪ friː taɪm/',
            stressGuide: 'FA-vou-rite, HOB-by, o-ri-GA-mi, MOD-els.',
            meaningVi: 'Sở thích yêu thích của tôi là gấp các mô hình origami vào thời gian rảnh.',
            topic: 'Hobbies'
          },
          {
            id: 'sp7-2',
            title: 'Thời gian bắt đầu sở thích',
            targetSentence: 'I took up gardening three years ago because I love flowers.',
            ipa: '/aɪ tʊk ʌp ˈɡɑːdnɪŋ θriː jɪəz əˈɡəʊ bɪˈkɒz aɪ lʌv ˈflaʊərz/',
            stressGuide: 'TOOK UP, GAR-den-ing, THREE YEARS, FLOW-ers.',
            meaningVi: 'Tôi bắt đầu làm vườn 3 năm trước vì tôi rất yêu các loài hoa.',
            topic: 'Hobbies'
          },
          {
            id: 'sp7-3',
            title: 'Lợi ích đối với tinh thần',
            targetSentence: 'Reading comic books helps me relax after stressful exams at school.',
            ipa: '/ˈriːdɪŋ ˈkɒmɪk bʊks helps miː rɪˈlæks ˈɑːftər ˈstresfl ɪɡˈzæmz æt skuːl/',
            stressGuide: 'READ-ing, COM-ic, RE-LAX, STRESS-ful, ex-AMS.',
            meaningVi: 'Đọc truyện tranh giúp tôi thư giãn sau những kỳ thi căng thẳng ở trường.',
            topic: 'Mental Health'
          },
          {
            id: 'sp7-4',
            title: 'Diễn tả sự say mê',
            targetSentence: 'My brother is really hooked on collecting stamps and vintage coins.',
            ipa: '/maɪ ˈbrʌðər ɪz ˈrɪəli hʊkt ɒn kəˈlektɪŋ stæmps ænd ˈvɪntɪdʒ kɔɪnz/',
            stressGuide: 'BRO-ther, HOOKED ON, col-LEC-ting, STAMPS, VIN-tage.',
            meaningVi: 'Anh trai tôi rất say mê sưu tập tem và các đồng tiền xu cổ.',
            topic: 'Collections'
          },
          {
            id: 'sp7-5',
            title: 'Hỏi sở thích người khác',
            targetSentence: 'Do you fancy joining our photography club this weekend?',
            ipa: '/duː juː ˈfænsi ˈdʒɔɪnɪŋ ˈaʊər fəˈtɒɡrəfi klʌb ðɪs ˌwiːkˈend/',
            stressGuide: 'FAN-cy, JOIN-ing, pho-TOG-ra-phy, WEEK-end.',
            meaningVi: 'Bạn có hứng thú tham gia câu lạc bộ nhiếp ảnh của chúng mình cuối tuần này không?',
            topic: 'Invitations'
          },
          {
            id: 'sp7-6',
            title: 'Chia sẻ sự kiên nhẫn',
            targetSentence: 'Carving wooden statues requires extraordinary patience and creativity.',
            ipa: '/ˈkɑːvɪŋ ˈwʊdn ˈstætʃuːz rɪˈkwaɪərz ɪkˈstrɔːdnri ˈpeɪʃns ænd ˌkriːeɪˈtɪvəti/',
            stressGuide: 'CARV-ing, STAT-ues, re-QUIRES, PA-tience, crea-TI-vi-ty.',
            meaningVi: 'Chạm khắc tượng gỗ đòi hỏi sự kiên nhẫn phi thường và óc sáng tạo.',
            topic: 'Skills'
          }          ,
          {
            id: 'sp7-7',
            title: 'Hỏi về thời gian làm vườn',
            targetSentence: 'How much time do you spend watering plants every week?',
            ipa: '/haʊ mʌtʃ taɪm duː juː spend ˈwɔːtərɪŋ plɑːnts ˈevri wiːk/',
            stressGuide: 'HOW MUCH TIME, SPEND, WA-ter-ing, PLANTS, EV-e-ry WEEK.',
            meaningVi: 'Bạn dành bao nhiêu thời gian tưới cây mỗi tuần?',
            topic: 'Hobbies'
          },
          {
            id: 'sp7-8',
            title: 'Cảm giác hoàn thành tác phẩm',
            targetSentence: 'I feel very proud and excited whenever I finish a beautiful origami swan.',
            ipa: '/aɪ fiːl ˈveri praʊd ænd ɪkˈsaɪtɪd wenˈevər aɪ ˈfɪnɪʃ ə ˈbjuːtɪfl ˌɒrɪˈɡɑːmi swɒn/',
            stressGuide: 'FEEL, PROUD, ex-CI-ted, FIN-ish, BEAU-ti-ful, o-ri-GA-mi SWAN.',
            meaningVi: 'Tôi cảm thấy rất tự hào và hào hứng mỗi khi hoàn thành một con thiên nga origami xinh đẹp.',
            topic: 'Hobbies'
          }
        ]
      },
      reading: {
        id: 'r7-1',
        title: 'The Surprising Benefits of Hobbies for Young People',
        grade: 7,
        unit: 1,
        wordCount: 190,
        topic: 'Personal development',
        passage: 'Having a hobby is much more than just a pleasant way to pass the time. Research shows that engaging in creative activities brings significant mental and physical benefits for teenagers. Firstly, hobbies help reduce stress after long hours of studying for exams. When you focus on painting, playing an instrument, or tending a small garden, your mind relaxes and enters a calm state. Secondly, many hobbies develop practical life skills. For example, cooking teaches teens about nutrition, budgeting, and responsibility. Model building or coding develops problem-solving and patience. Finally, hobbies can connect you with people who share the same passion. Joining a photography or chess club allows students to make wonderful new friends and build confidence. Therefore, every teenager should choose at least one meaningful hobby to enrich their everyday life.',
        translationVi: 'Có một sở thích ý nghĩa hơn rất nhiều so với việc chỉ đơn thuần là giết thời gian. Nghiên cứu chỉ ra rằng tham gia vào các hoạt động sáng tạo mang lại những lợi ích to lớn cả về thể chất lẫn tinh thần cho thanh thiếu niên. Thứ nhất, sở thích giúp giải tỏa căng thẳng sau những giờ học bài ôn thi dài. Khi bạn tập trung vẽ tranh, chơi một nhạc cụ, hay chăm sóc một khu vườn nhỏ, tâm trí bạn sẽ thư thái và đi vào trạng thái bình yên. Thứ hai, nhiều sở thích phát triển những kỹ năng sống thực tế. Ví dụ, nấu ăn dạy cho bạn trẻ về dinh dưỡng, quản lý chi tiêu và tinh thần trách nhiệm. Lắp ráp mô hình hoặc lập trình rèn luyện tính kiên nhẫn và kỹ năng giải quyết vấn đề. Cuối cùng, sở thích kết nối bạn với những người có chung niềm đam mê. Tham gia một câu lạc bộ nhiếp ảnh hay câu lạc bộ cờ vua giúp học sinh kết thêm nhiều bạn mới và xây dựng sự tự tin. Vì vậy, mỗi học sinh THCS nên chọn cho mình ít nhất một sở thích lành mạnh để làm phong phú cuộc sống.',
        vocabularyHighlights: [
          { word: 'significant', ipa: '/sɪɡˈnɪfɪkənt/', meaningVi: 'đáng kể, to lớn' },
          { word: 'reduce stress', ipa: '/rɪˈdjuːs stres/', meaningVi: 'giảm bớt căng thẳng' },
          { word: 'passion', ipa: '/ˈpæʃn/', meaningVi: 'niềm đam mê' }
        ],
        questions: [
          {
            id: 'rq7-1',
            prompt: 'According to the passage, how do hobbies help after long study hours?',
            type: 'mcq',
            options: ['They help you memorize formulas faster', 'They reduce stress and relax the mind', 'They guarantee top exam scores', 'They make you stay awake at night'],
            correctAnswer: 1,
            explanationVi: 'Dẫn chứng: "Firstly, hobbies help reduce stress after long hours of studying for exams... your mind relaxes and enters a calm state."',
            passageEvidence: 'help reduce stress after long hours of studying',
            category: 'Reading'
          },
          {
            id: 'rq7-2',
            prompt: 'What life skills can cooking teach teenagers?',
            type: 'mcq',
            options: ['Driving and sports skills', 'Nutrition, budgeting, and responsibility', 'Coding and mathematics', 'Painting and drawing'],
            correctAnswer: 1,
            explanationVi: 'Dẫn chứng: "For example, cooking teaches teens about nutrition, budgeting, and responsibility."',
            passageEvidence: 'cooking teaches teens about nutrition, budgeting, and responsibility',
            category: 'Reading'
          },
          {
            id: 'rq7-3',
            prompt: 'Which skills do model building or coding help develop?',
            type: 'mcq',
            options: ['Problem-solving and patience', 'Swimming and diving', 'Singing and dancing', 'Foreign language grammar only'],
            correctAnswer: 0,
            explanationVi: 'Dẫn chứng: "Model building or coding develops problem-solving and patience."',
            passageEvidence: 'develops problem-solving and patience',
            category: 'Reading'
          },
          {
            id: 'rq7-4',
            prompt: 'How can joining a chess club benefit students socially?',
            type: 'mcq',
            options: ['It helps them win monetary prizes', 'It allows them to make new friends and build confidence', 'It makes them famous at school', 'It eliminates all homework'],
            correctAnswer: 1,
            explanationVi: 'Dẫn chứng: "allows students to make wonderful new friends and build confidence."',
            passageEvidence: 'make wonderful new friends and build confidence',
            category: 'Reading'
          },
          {
            id: 'rq7-5',
            prompt: 'The word "passion" in the passage is closest in meaning to:',
            type: 'mcq',
            options: ['Duty', 'Strong interest or love for something', 'Boredom', 'Fear'],
            correctAnswer: 1,
            explanationVi: '"passion" nghĩa là niềm đam mê mãnh liệt đối với một lĩnh vực.',
            category: 'Reading'
          },
          {
            id: 'rq7-6',
            prompt: 'What is the main advice given in the conclusion of the passage?',
            type: 'mcq',
            options: ['Stop studying to do hobbies all day', 'Teenagers should choose at least one meaningful hobby', 'Only do physical outdoor hobbies', 'Avoid making new friends online'],
            correctAnswer: 1,
            explanationVi: 'Dẫn chứng: "Therefore, every teenager should choose at least one meaningful hobby to enrich their everyday life."',
            passageEvidence: 'every teenager should choose at least one meaningful hobby',
            category: 'Reading'
          }
        ,
          {
            id: 'rq7-7',
            prompt: 'Doing outdoor hobbies helps young people spend less time looking at digital screens.',
            type: 'true_false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanationVi: 'Dẫn chứng: "...and reduce screen time on phones or tablets" => Đúng (True).',
            passageEvidence: 'reduce screen time on phones or tablets',
            category: 'Reading'
          },
          {
            id: 'rq7-8',
            prompt: 'Which hobby is mentioned as an indoor creative art?',
            type: 'mcq',
            options: ['Drawing and painting', 'Football and swimming', 'Mountain climbing', 'Jogging in the park'],
            correctAnswer: 0,
            explanationVi: 'Dẫn chứng trong đoạn 2 nói về các môn nghệ thuật sáng tạo trong nhà (drawing and painting).',
            passageEvidence: 'drawing and painting',
            category: 'Reading'
          },]
      },
      writing: {
        id: 'w7-1',
        title: 'My Favourite Hobby',
        grade: 7,
        unit: 1,
        topicPrompt: 'Write a paragraph (60 - 80 words) about your favourite hobby. Describe when you started it, who you do it with, and why you like it.',
        minWords: 60,
        maxWords: 95,
        outlineVi: [
          'Câu mở đoạn: Giới thiệu sở thích (My favourite hobby is... / I love...).',
          'Thân đoạn 1: Thời điểm bắt đầu và cách thực hiện (I started it... ago. I often do it...).',
          'Thân đoạn 2: Ai làm cùng và những gì cần thiết (I usually do it with... To do this, I need...).',
          'Câu kết: Lợi ích và cảm xúc (This hobby helps me... I think it is...).'
        ],
        suggestedPhrases: [
          { phrase: 'I have had this hobby for...', meaningVi: 'Tôi có sở thích này được...' },
          { phrase: 'In my spare time, I enjoy...', meaningVi: 'Vào thời gian rảnh, tôi thích...' },
          { phrase: 'It helps me relieve stress and...', meaningVi: 'Nó giúp tôi giải tỏa căng thẳng và...' },
          { phrase: 'I find this hobby very relaxing...', meaningVi: 'Tôi thấy sở thích này rất thư thái...' }
        ],
        sampleEssay: 'My favourite hobby is reading science books in my free time. I started this hobby when I was eight years old. My father bought me my first illustrated encyclopedia about animals, and I was fascinated. I usually read for thirty minutes before bedtime every night. Reading helps me broaden my knowledge and learn new English words. It also helps me relax after a busy day at school. I believe reading is a wonderful habit for all teenagers.',
        practiceTasks: [
          {
            id: 'wt7-1',
            type: 'sentence_transformation',
            prompt: 'Viết lại câu sau sử dụng cấu trúc "enjoy": "Lan likes making handmade paper flowers." -> "Lan enjoys ______."',
            guideVi: 'Sau "enjoys" chia động từ V-ing.',
            sampleAnswer: 'Lan enjoys making handmade paper flowers.'
          },
          {
            id: 'wt7-2',
            type: 'sentence_transformation',
            prompt: 'Viết lại câu sau sử dụng "take up": "I started swimming three years ago." -> "I ______ three years ago."',
            guideVi: 'Quá khứ của take up là took up.',
            sampleAnswer: 'I took up swimming three years ago.'
          },
          {
            id: 'wt7-3',
            type: 'sentence_combine',
            prompt: 'Nối 2 câu sau bằng "so": "Gardening helps me relax. I spend thirty minutes every day watering plants."',
            guideVi: 'Dùng liên từ chỉ kết quả "so".',
            sampleAnswer: 'Gardening helps me relax, so I spend thirty minutes every day watering plants.'
          },
          {
            id: 'wt7-4',
            type: 'error_correction',
            prompt: 'Tìm và sửa 1 lỗi sai trong câu: "My brother hates wash dirty dishes after big meals."',
            guideVi: 'Sau "hates" cần dùng danh động từ V-ing (washing).',
            sampleAnswer: 'My brother hates washing dirty dishes after big meals.'
          },
          {
            id: 'wt7-5',
            type: 'sentence_reorder',
            prompt: 'Sắp xếp các từ thành câu hoàn chỉnh: "beneficial / reading / books / is / for / memory / your / ."',
            guideVi: 'Chủ ngữ danh động từ + is beneficial for...',
            sampleAnswer: 'Reading books is beneficial for your memory.'
          }
        ,
          {
            id: 'wt7-6',
            type: 'sentence_transformation',
            prompt: 'Viết lại câu dùng "interested in": "He likes collecting foreign stamps." -> "He is ______."',
            guideVi: 'Cấu trúc: be interested in + V-ing.',
            sampleAnswer: 'He is interested in collecting foreign stamps.'
          },
          {
            id: 'wt7-7',
            type: 'sentence_reorder',
            prompt: 'Sắp xếp lại: "hobby / started / I / two / this / ago / years ."',
            guideVi: 'S + V + O + time + ago.',
            sampleAnswer: 'I started this hobby two years ago.'
          },
          {
            id: 'wt7-8',
            type: 'sentence_combine',
            prompt: 'Nối câu bằng "although": "Painting is difficult. I still enjoy doing it every weekend."',
            guideVi: 'Dùng liên từ nhượng bộ Although đứng đầu câu.',
            sampleAnswer: 'Although painting is difficult, I still enjoy doing it every weekend.'
          },]
      },
      quizQuestions: [
        {
          id: 'qz7-1',
          prompt: 'My sister detests ______ dirty dishes after big family parties.',
          type: 'mcq',
          options: ['wash', 'washing', 'to wash', 'washed'],
          correctAnswer: 1,
          explanationVi: 'Động từ "detest" (cực kỳ ghét) theo sau bởi danh động từ V-ing => "washing".',
          category: 'Grammar'
        },
        {
          id: 'qz7-2',
          prompt: 'Which hobby involves folding square sheets of paper into animal shapes?',
          type: 'mcq',
          options: ['Gardening', 'Origami', 'Skating', 'Pottery'],
          correctAnswer: 1,
          explanationVi: '"Origami" là nghệ thuật gấp giấy tạo hình của Nhật Bản.',
          category: 'Vocabulary'
        },
        {
          id: 'qz7-3',
          prompt: 'Choose the word with the stress on the first syllable:',
          type: 'mcq',
          options: ['patience', 'enjoy', 'prefer', 'relax'],
          correctAnswer: 0,
          explanationVi: '"patience" /ˈpeɪʃns/ có trọng âm rơi vào âm tiết thứ nhất. Các từ còn lại có trọng âm rơi vào âm tiết thứ hai.',
          category: 'Pronunciation'
        },
        {
          id: 'qz7-4',
          prompt: 'Eating lots of fresh fruit and exercising daily is ______ for your health.',
          type: 'mcq',
          options: ['harmful', 'beneficial', 'painful', 'useless'],
          correctAnswer: 1,
          explanationVi: '"beneficial" = có lợi, mang lại điều tốt cho sức khỏe.',
          category: 'Vocabulary'
        },
        {
          id: 'qz7-5',
          prompt: 'To carve eggshells, Minh must have extraordinary ______ and very gentle hands.',
          type: 'mcq',
          options: ['patience', 'carelessness', 'laziness', 'anger'],
          correctAnswer: 0,
          explanationVi: '"patience" nghĩa là tính kiên nhẫn, nhẫn nại.',
          category: 'Vocabulary'
        },
        {
          id: 'qz7-6',
          prompt: 'He likes ______ outdoor sports because they keep him healthy.',
          type: 'mcq',
          options: ['playing', 'played', 'to playing', 'plays'],
          correctAnswer: 0,
          explanationVi: 'Sau "likes" dùng danh động từ "playing".',
          category: 'Grammar'
        },
        {
          id: 'qz7-7',
          prompt: 'How many hours a week do you spend ______ your hobbies?',
          type: 'mcq',
          options: ['in', 'at', 'on', 'with'],
          correctAnswer: 2,
          explanationVi: 'Cấu trúc "spend time on something" (dành thời gian cho việc gì).',
          category: 'Grammar'
        },
        {
          id: 'qz7-8',
          prompt: 'Which word has the underlined part pronounced as /k/?',
          type: 'mcq',
          options: ['<u>ch</u>ess', '<u>ch</u>icken', '<u>ch</u>emistry', '<u>ch</u>ildren'],
          correctAnswer: 2,
          explanationVi: '"chemistry" phát âm là /k/, các từ còn lại phát âm là /tʃ/.',
          category: 'Pronunciation'
        }
      ]
    }
  ],

  // LỚP 8
  8: [
    {
      unitNumber: 1,
      title: 'Unit 1: Leisure Time',
      descriptionVi: 'Các hoạt động giải trí lành mạnh, thói quen sử dụng công nghệ và dạng so sánh trạng từ.',
      grade: 8,
      vocabularies: [
        {
          id: 'v8-1',
          word: 'leisure activity',
          ipa: '/ˈleʒər ækˈtɪvəti/',
          partOfSpeech: 'noun',
          meaningVi: 'hoạt động giải trí lúc rảnh rỗi',
          exampleEn: 'Cycling around the lake is a popular leisure activity.',
          exampleVi: 'Đạp xe quanh hồ là một hoạt động giải trí phổ biến.',
          topic: 'Leisure',
          grade: 8,
          unit: 1
        },
        {
          id: 'v8-2',
          word: 'hang out',
          ipa: '/hæŋ aʊt/',
          partOfSpeech: 'phrasal verb',
          meaningVi: 'đi chơi, tụ tập bạn bè',
          exampleEn: 'Teens often hang out at coffee shops on Saturday afternoons.',
          exampleVi: 'Các bạn thanh thiếu niên thường tụ tập ở quán cà phê vào chiều thứ Bảy.',
          topic: 'Social',
          grade: 8,
          unit: 1
        },
        {
          id: 'v8-3',
          word: 'DIY (Do It Yourself)',
          ipa: '/ˌdiː aɪ ˈwaɪ/',
          partOfSpeech: 'noun',
          meaningVi: 'tự làm đồ thủ công/sửa chữa',
          exampleEn: 'My brother loves DIY projects like building wooden shelves.',
          exampleVi: 'Anh tôi thích các dự án tự làm đồ như đóng kệ gỗ.',
          topic: 'Leisure',
          grade: 8,
          unit: 1
        },
        {
          id: 'v8-4',
          word: 'hooked on',
          ipa: '/hʊkt ɒn/',
          partOfSpeech: 'adjective',
          meaningVi: 'say mê, nghiện (thích thú)',
          exampleEn: 'She is completely hooked on modern board games.',
          exampleVi: 'Cô ấy hoàn toàn say mê các trò chơi cờ bàn hiện đại.',
          topic: 'Interests',
          grade: 8,
          unit: 1
        },
        {
          id: 'v8-5',
          word: 'balance',
          ipa: '/ˈbæləns/',
          partOfSpeech: 'noun',
          meaningVi: 'sự cân bằng',
          exampleEn: 'You should keep a healthy balance between study and recreation.',
          exampleVi: 'Bạn nên duy trì sự cân bằng lành mạnh giữa việc học và giải trí.',
          topic: 'Lifestyle',
          grade: 8,
          unit: 1
        }
      ],
      grammar: {
        id: 'g8-1',
        title: 'Verbs of Liking Followed by Gerunds or To-Infinitives',
        grade: 8,
        unit: 1,
        formula: 'love/like/prefer + V-ing HOẶC love/like/prefer + to-V\nNhưng: adore, enjoy, fancy, mind, detest CHỈ đi với V-ing!',
        usageVi: 'Một số động từ (like, love, prefer) có thể đi với cả V-ing lẫn To-infinitive mà nghĩa không đổi nhiều. Tuy nhiên các động từ như enjoy, fancy, adore, avoid, mind, detest BẮT BUỘC đi với V-ing.',
        signalsVi: [
          'fancy + V-ing: có hứng thú làm gì',
          'keen on / fond of + V-ing: yêu thích',
          'don\'t mind + V-ing: không phiền khi làm gì'
        ],
        examples: [
          { en: 'Do you fancy hanging out at the new shopping mall?', vi: 'Bạn có hứng thú đi chơi ở trung tâm thương mại mới không?' },
          { en: 'He prefers to play badminton rather than watch TV.', vi: 'Cậu ấy thích chơi cầu lông hơn là xem tivi.' }
        ],
        commonMistakesVi: [
          'Dùng to-V sau động từ "fancy" hoặc "enjoy" (VD: "I fancy to go" là SAI, phải là "I fancy going").',
          'Nhầm lẫn cấu trúc prefer V-ing to V-ing (thích cái này hơn cái kia).'
        ],
        practiceQuestions: [
          {
            id: 'gp8-1',
            prompt: 'Do you fancy ______ a movie with us this evening?',
            type: 'mcq',
            options: ['watch', 'to watch', 'watching', 'watched'],
            correctAnswer: 2,
            explanationVi: 'Sau "fancy", bắt buộc dùng danh động từ V-ing => "watching".',
            category: 'Grammar'
          }
        ,
        {
          id: 'qz7-9',
          prompt: 'Nam prefers ______ soccer with his classmates to watching TV at home.',
          type: 'mcq',
          options: ['play', 'playing', 'played', 'to play'],
          correctAnswer: 1,
          explanationVi: 'Cấu trúc: prefer V-ing to V-ing (thích làm cái này hơn làm cái kia).',
          category: 'Grammar'
        },
        {
          id: 'qz7-10',
          prompt: 'Which word has a different stress pattern from the others?',
          type: 'mcq',
          options: ['hobby', 'collect', 'model', 'gardening'],
          correctAnswer: 1,
          explanationVi: '"collect" nhấn âm tiết thứ hai (/kəˈlekt/), các từ còn lại nhấn âm tiết thứ nhất.',
          category: 'Pronunciation'
        },]
      },
      listening: {
        id: 'l8-1',
        title: 'Dialogue: How Vietnamese Teenagers Spend Their Free Time',
        difficulty: 'Medium',
        grade: 8,
        unit: 1,
        audioPrompt: 'Interviewer: Good morning Mai. What do you and your classmates usually do in your leisure time? Mai: Well, on weekdays, we are quite busy with school and extra classes. But on weekends, my friends love hanging out at the community youth club. We often play badminton, practice guitar, or do DIY crafts together. Interviewer: Do you spend much time on social media? Mai: Personally, I try to limit my screen time to under one hour a day. I prefer physical outdoor activities because they make me feel energetic.',
        sentences: [
          { id: 1, text: 'Good morning Mai. What do you usually do in your leisure time?', translationVi: 'Chào buổi sáng Mai. Bạn thường làm gì vào thời gian rảnh?', timestamp: '0:00' },
          { id: 2, text: 'On weekends, my friends love hanging out at the community youth club.', translationVi: 'Vào cuối tuần, các bạn mình thích tụ tập tại câu lạc bộ thanh thiếu niên cộng đồng.', timestamp: '0:05' },
          { id: 3, text: 'We often play badminton, practice guitar, or do DIY crafts.', translationVi: 'Chúng mình thường chơi cầu lông, tập đàn ghita hoặc làm đồ thủ công.', timestamp: '0:10' },
          { id: 4, text: 'I try to limit my screen time to under one hour a day.', translationVi: 'Mình cố gắng giới hạn thời gian dùng màn hình dưới 1 tiếng mỗi ngày.', timestamp: '0:15' }
        ],
        transcriptVi: 'Phóng viên: Chào Mai. Bạn và các bạn thường làm gì vào thời gian rảnh rỗi? Mai: Vào các ngày trong tuần chúng mình khá bận học. Nhưng cuối tuần, các bạn mình thích đến câu lạc bộ thanh niên địa phương để chơi cầu lông, tập ghita hoặc làm đồ thủ công DIY. Phóng viên: Bạn có dùng mạng xã hội nhiều không? Mai: Mình cố gắng giới hạn thời gian dùng điện thoại dưới 1 tiếng mỗi ngày để tập trung chơi thể thao ngoài trời cho khỏe khoắn.',
        keywords: [
          { word: 'leisure time', ipa: '/ˈleʒər taɪm/', meaningVi: 'thời gian rảnh rỗi' },
          { word: 'limit screen time', ipa: '/ˈlɪmɪt skriːn taɪm/', meaningVi: 'giới hạn thời gian nhìn màn hình' }
        ],
        questions: [
          {
            id: 'lq8-1',
            prompt: 'Where do Mai and her friends hang out on weekends?',
            type: 'mcq',
            options: ['At cinema complexes', 'At the community youth club', 'At an internet cafe', 'At school classrooms'],
            correctAnswer: 1,
            explanationVi: 'Trong bài nghe: "...hanging out at the community youth club."',
            category: 'Listening'
          },
          {
            id: 'lq8-2',
            prompt: 'Which activities do they do at the club?',
            type: 'mcq',
            options: ['Play badminton, practice guitar, or do DIY crafts', 'Swimming and cooking classes only', 'Computer gaming tournaments', 'Watching Hollywood movies'],
            correctAnswer: 0,
            explanationVi: 'Trong bài nghe: "We often play badminton, practice guitar, or do DIY crafts together."',
            category: 'Listening'
          },
          {
            id: 'lq8-3',
            prompt: 'How much screen time does Mai try to limit herself to every day?',
            type: 'mcq',
            options: ['Under thirty minutes', 'Under one hour a day', 'Three hours a day', 'No limit at all'],
            correctAnswer: 1,
            explanationVi: 'Trong bài nghe: "...limit my screen time to under one hour a day."',
            category: 'Listening'
          },
          {
            id: 'lq8-4',
            prompt: 'Why does Mai prefer physical outdoor activities?',
            type: 'mcq',
            options: ['Because they make her feel energetic', 'Because her parents force her to', 'Because she dislikes indoor games', 'Because it costs less money'],
            correctAnswer: 0,
            explanationVi: 'Trong bài nghe: "I prefer physical outdoor activities because they make me feel energetic."',
            category: 'Listening'
          },
          {
            id: 'lq8-5',
            prompt: 'On weekdays, Mai and her classmates are very busy with school.',
            type: 'true_false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanationVi: 'Trong bài nghe: "Well, on weekdays, we are quite busy with school and extra classes." => Đúng (True).',
            category: 'Listening'
          },
          {
            id: 'lq8-6',
            prompt: 'What musical instrument does Mai practice with friends?',
            type: 'mcq',
            options: ['Piano', 'Violin', 'Guitar', 'Drums'],
            correctAnswer: 2,
            explanationVi: 'Dẫn chứng: "...practice guitar, or do DIY crafts together." => đàn guitar.',
            category: 'Listening'
          }
        ,
          {
            id: 'lq8-7',
            prompt: 'What should teens do to avoid eye strain according to health experts?',
            type: 'mcq',
            options: ['Follow the 20-20-20 rule and take regular breaks', 'Play online games late at night', 'Wear sunglasses indoors', 'Turn up screen brightness to 100%'],
            correctAnswer: 0,
            explanationVi: 'Quy tắc 20-20-20 giúp mắt thư giãn khi sử dụng thiết bị số trong giờ giải trí.',
            category: 'Listening'
          },
          {
            id: 'lq8-8',
            prompt: 'Playing team sports helps teenagers develop teamwork and leadership skills.',
            type: 'true_false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanationVi: 'Dẫn chứng: Thể thao đồng đội rèn luyện tinh thần đồng đội và kỹ năng lãnh đạo => True.',
            category: 'Listening'
          },]
      },
      speaking: {
        id: 's8-1',
        title: 'Discussing Leisure Preferences',
        grade: 8,
        unit: 1,
        targetSentence: 'I prefer outdoor sports because they keep me healthy and refreshed.',
        ipa: '/aɪ prɪˈfɜːr ˈaʊtdɔːr spɔːts bɪˈkɒz ðeɪ kiːp miː ˈhelθi ænd rɪˈfreʃt/',
        stressGuide: 'Nhấn trọng âm: pre-FER, OUT-door SPORTS, KEEP, HEALTH-y, re-FRESHED.',
        meaningVi: 'Tôi thích các môn thể thao ngoài trời hơn vì chúng giúp tôi khỏe mạnh và sảng khoái.',
        samplePrompt: 'Luyện đọc to câu trên, chú ý phát âm phụ âm kép /sp/ và đuôi /t/ trong "refreshed".',
        topic: 'Lifestyle',
        items: [
          {
            id: 'sp8-1',
            title: 'Sở thích thể thao ngoài trời',
            targetSentence: 'I prefer outdoor sports because they keep me healthy and refreshed.',
            ipa: '/aɪ prɪˈfɜːr ˈaʊtdɔːr spɔːts bɪˈkɒz ðeɪ kiːp miː ˈhelθi ænd rɪˈfreʃt/',
            stressGuide: 'pre-FER, OUT-door SPORTS, HEALTH-y, re-FRESHED.',
            meaningVi: 'Tôi thích các môn thể thao ngoài trời hơn vì chúng giúp tôi khỏe mạnh và sảng khoái.',
            topic: 'Lifestyle'
          },
          {
            id: 'sp8-2',
            title: 'Dự án thủ công tự làm DIY',
            targetSentence: 'My sister enjoys doing DIY projects like making origami flower vases.',
            ipa: '/maɪ ˈsɪstər ɪnˈdʒɔɪz ˈduːɪŋ ˌdiː aɪ ˈwaɪ ˈprɒdʒekts laɪk ˈmeɪkɪŋ ˌɒrɪˈɡɑːmi ˈflaʊər ˈvɑːzɪz/',
            stressGuide: 'SIS-ter, en-JOYS, PRO-jects, o-ri-GA-mi, VA-ses.',
            meaningVi: 'Em gái tôi thích các dự án tự làm đồ như gấp bình hoa origami.',
            topic: 'DIY'
          },
          {
            id: 'sp8-3',
            title: 'Giới hạn thời gian màn hình',
            targetSentence: 'Teens should limit their screen time to avoid hurting their eyes.',
            ipa: '/tiːnz ʃʊd ˈlɪmɪt ðeər skriːn taɪm tuː əˈvɔɪd ˈhɜːtɪŋ ðeər aɪz/',
            stressGuide: 'TEENS, LIM-it, SCREEN TIME, a-VOID, HURT-ing.',
            meaningVi: 'Thanh thiếu niên nên hạn chế thời gian nhìn màn hình để tránh hại mắt.',
            topic: 'Health'
          },
          {
            id: 'sp8-4',
            title: 'Hỏi về thời gian rảnh rỗi',
            targetSentence: 'Do you fancy hanging out at the community youth club this Sunday?',
            ipa: '/duː juː ˈfænsi ˈhæŋɪŋ aʊt æt ðə kəˈmjuːnəti juːθ klʌb ðɪs ˈsʌndeɪ/',
            stressGuide: 'FAN-cy, HANG-ing, com-MU-ni-ty, YOUTH CLUB, SUN-day.',
            meaningVi: 'Bạn có hứng thú đi chơi tại câu lạc bộ thanh thiếu niên Chủ nhật này không?',
            topic: 'Social'
          },
          {
            id: 'sp8-5',
            title: 'Cân bằng giữa học và chơi',
            targetSentence: 'Finding a balance between academic study and relaxation is essential.',
            ipa: '/ˈfaɪndɪŋ ə ˈbæləns bɪˈtwiːn ˌækəˈdemɪk ˈstʌdi ænd ˌriːlækˈseɪʃn ɪz ɪˈsenʃl/',
            stressGuide: 'BAL-ance, ac-a-DEM-ic, re-lax-A-tion, es-SEN-tial.',
            meaningVi: 'Tìm được sự cân bằng giữa học văn hóa và giải trí là điều rất cần thiết.',
            topic: 'Balance'
          },
          {
            id: 'sp8-6',
            title: 'Tụ tập cuối tuần',
            targetSentence: 'Cycling around West Lake in the early morning is very refreshing.',
            ipa: '/ˈsaɪklɪŋ əˈraʊnd west leɪk ɪn ði ˈɜːli ˈmɔːnɪŋ ɪz ˈveri rɪˈfreʃɪŋ/',
            stressGuide: 'CY-cling, WEST LAKE, EAR-ly, re-FRESH-ing.',
            meaningVi: 'Đạp xe quanh Hồ Tây vào sáng sớm mang lại cảm giác rất sảng khoái.',
            topic: 'Outdoor'
          }          ,
          {
            id: 'sp8-7',
            title: 'Hỏi về hoạt động cuối tuần',
            targetSentence: 'What leisure activities do you usually hang out with your close friends on weekends?',
            ipa: '/wɒt ˈleʒər ækˈtɪvɪtiz duː juː ˈjuːʒuəli hæŋ aʊt wɪð jɔːr kləʊs frendz ɒn ˌwiːkˈendz/',
            stressGuide: 'LEI-sure, ac-TIV-i-ties, HANG OUT, CLOSE FRIENDS, WEEK-ends.',
            meaningVi: 'Bạn thường đi chơi những hoạt động giải trí nào cùng bạn thân vào cuối tuần?',
            topic: 'Leisure Time'
          },
          {
            id: 'sp8-8',
            title: 'Cân bằng giữa học và chơi',
            targetSentence: 'Balancing study time and leisure activities is extremely important for our well-being.',
            ipa: '/ˈbælənsɪŋ ˈstʌdi taɪm ænd ˈleʒər ækˈtɪvɪtiz ɪz ɪkˈstriːmli ɪmˈpɔːtnt fɔːr ˈaʊər ˌwelˈbiːɪŋ/',
            stressGuide: 'BAL-anc-ing, LEI-sure, ex-TREME-ly, im-POR-tant, WELL-BE-ing.',
            meaningVi: 'Cân bằng giữa giờ học và hoạt động giải trí là điều cực kỳ quan trọng cho sức khỏe của chúng ta.',
            topic: 'Lifestyle'
          }
        ]
      },
      reading: {
        id: 'r8-1',
        title: 'The Shift in Rural Leisure in Modern Viet Nam',
        grade: 8,
        unit: 1,
        wordCount: 220,
        topic: 'Culture & Modernization',
        passage: 'In the past, leisure activities in Vietnamese rural areas were closely tied to nature and traditional games. Children used to fly bamboo kites over golden rice fields, swim in cool rivers, and play hide-and-seek under the shade of ancient banyan trees during summer afternoons. Elders gathered at the communal village house to drink green tea, play Chinese chess, and share folklore stories. Today, economic growth and modern technology have transformed free-time habits in the countryside. High-speed internet is now available in almost every rural home. Teenagers enjoy watching streaming videos, connecting with friends through online games, and learning English through educational apps. However, many communities are making admirable efforts to preserve traditional folk games during village festivals. Striking a harmonious balance between digital entertainment and outdoor cultural heritage allows modern Vietnamese teenagers to enjoy the best of both worlds.',
        translationVi: 'Trước đây, các hoạt động giải trí ở vùng nông thôn Việt Nam gắn liền mật thiết với thiên nhiên và các trò chơi dân gian. Trẻ em từng thả những cánh diều tre trên cánh đồng lúa chín vàng, tắm mát trên những dòng sông trong lành và chơi trốn tìm dưới bóng cây đa cổ thụ mỗi buổi chiều hè. Các cụ già tụ họp tại đình làng uống trà xanh, đánh cờ tướng và kể chuyện dân gian. Ngày nay, sự phát triển kinh tế và công nghệ hiện đại đã làm thay đổi thói quen giải trí ở làng quê. Internet tốc độ cao đã có mặt tại hầu hết mọi gia đình. Các bạn trẻ thích xem video trực tuyến, kết nối bạn bè qua trò chơi điện tử và học tiếng Anh qua các ứng dụng. Tuy nhiên, nhiều địa phương đang nỗ lực bảo tồn các trò chơi dân gian trong các dịp lễ hội làng. Việc dung hòa giữa giải trí số và di sản văn hóa ngoài trời giúp thanh thiếu niên nông thôn ngày nay có được trải nghiệm trọn vẹn nhất.',
        vocabularyHighlights: [
          { word: 'transformed', ipa: '/trænsˈfɔːmd/', meaningVi: 'đã thay đổi, biến đổi' },
          { word: 'harmonious balance', ipa: '/hɑːˈməʊniəs ˈbæləns/', meaningVi: 'sự cân bằng hài hòa' },
          { word: 'cultural heritage', ipa: '/ˈkʌltʃərəl ˈherɪtɪdʒ/', meaningVi: 'di sản văn hóa' }
        ],
        questions: [
          {
            id: 'rq8-1',
            prompt: 'What traditional game did children in rural areas use to play in the past?',
            type: 'mcq',
            options: ['Flying bamboo kites over rice fields', 'Playing mobile video games', 'Watching television series', 'Browsing social media'],
            correctAnswer: 0,
            explanationVi: 'Dẫn chứng: "Children used to fly bamboo kites over golden rice fields, swim in cool rivers..."',
            passageEvidence: 'Children used to fly bamboo kites over golden rice fields',
            category: 'Reading'
          },
          {
            id: 'rq8-2',
            prompt: 'Where did the village elders use to gather in the past?',
            type: 'mcq',
            options: ['At cinema complexes', 'At the communal village house', 'At cyber cafes', 'In the city center'],
            correctAnswer: 1,
            explanationVi: 'Dẫn chứng: "Elders gathered at the communal village house to drink green tea, play Chinese chess..."',
            passageEvidence: 'communal village house',
            category: 'Reading'
          },
          {
            id: 'rq8-3',
            prompt: 'What technology has transformed free-time habits in the countryside today?',
            type: 'mcq',
            options: ['High-speed internet in almost every home', 'Space travel satellites', 'Nuclear power plants', 'Flying cars'],
            correctAnswer: 0,
            explanationVi: 'Dẫn chứng: "High-speed internet is now available in almost every rural home."',
            passageEvidence: 'High-speed internet is now available in almost every rural home',
            category: 'Reading'
          },
          {
            id: 'rq8-4',
            prompt: 'How do rural teenagers today use the internet for personal growth?',
            type: 'mcq',
            options: ['Only playing online games', 'Learning English through educational apps', 'Buying cars', 'Skipping school'],
            correctAnswer: 1,
            explanationVi: 'Dẫn chứng: "...and learning English through educational apps."',
            passageEvidence: 'learning English through educational apps',
            category: 'Reading'
          },
          {
            id: 'rq8-5',
            prompt: 'When do communities preserve traditional folk games today?',
            type: 'mcq',
            options: ['During village festivals', 'Never', 'Only at midnight', 'Every single day during school hours'],
            correctAnswer: 0,
            explanationVi: 'Dẫn chứng: "...preserve traditional folk games during village festivals."',
            passageEvidence: 'during village festivals',
            category: 'Reading'
          },
          {
            id: 'rq8-6',
            prompt: 'What does "harmonious balance" in the final sentence suggest?',
            type: 'mcq',
            options: ['Abandoning old traditions completely', 'Combining digital entertainment with cultural outdoor heritage', 'Banning all computers and smartphones', 'Only focusing on physical farm labor'],
            correctAnswer: 1,
            explanationVi: 'Dẫn chứng: "Striking a harmonious balance between digital entertainment and outdoor cultural heritage allows modern Vietnamese teenagers to enjoy the best of both worlds."',
            passageEvidence: 'harmonious balance between digital entertainment and outdoor cultural heritage',
            category: 'Reading'
          }
        ,
          {
            id: 'rq8-7',
            prompt: 'Teenagers who spend excessive time on social media daily often experience poor sleep quality.',
            type: 'true_false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanationVi: 'Dẫn chứng: Sử dụng mạng xã hội quá nhiều ảnh hưởng tiêu cực đến giấc ngủ => True.',
            category: 'Reading'
          },
          {
            id: 'rq8-8',
            prompt: 'What is recommended as an alternative to passive screen leisure?',
            type: 'mcq',
            options: ['Participating in outdoor sports and creative arts clubs', 'Staying in a dark room all day', 'Eating snacks while watching movies', 'Sleeping 14 hours a day'],
            correctAnswer: 0,
            explanationVi: 'Dẫn chứng: Tham gia thể thao và câu lạc bộ nghệ thuật là lựa chọn thay thế lành mạnh.',
            category: 'Reading'
          },]
      },
      writing: {
        id: 'w8-1',
        title: 'An Email About Your Weekend Leisure Activities',
        grade: 8,
        unit: 1,
        topicPrompt: 'Write an informal email (80 - 100 words) to your foreign pen pal, Alex, describing how you usually spend your leisure time on weekends.',
        minWords: 75,
        maxWords: 110,
        outlineVi: [
          'Lời chào đầu thư: Hi Alex, / Dear Alex, How are things?',
          'Nội dung chính 1: Nêu các hoạt động giải trí ưa thích (On weekends, I usually...).',
          'Nội dung chính 2: Hoạt động cụ thể và cảm nhận (My favourite is... because...).',
          'Hỏi lại bạn pen pal: How about you? What do you do in your free time?',
          'Lời chào tạm biệt: Write back soon! Best wishes, [Tên bạn].'
        ],
        suggestedPhrases: [
          { phrase: 'I am writing to tell you about...', meaningVi: 'Tôi viết thư để kể cho bạn về...' },
          { phrase: 'I really adore...', meaningVi: 'Tôi rất thích...' },
          { phrase: 'It gives me a chance to...', meaningVi: 'Nó mang lại cho tôi cơ hội để...' },
          { phrase: 'How do you spend your weekends?', meaningVi: 'Bạn dành cuối tuần như thế nào?' }
        ],
        sampleEssay: 'Dear Alex,\n\nIt is great to hear from you again! In this email, I want to tell you about how I spend my weekends in Da Nang. On Saturday mornings, I usually go cycling along the beach with my classmates. The fresh sea breeze always makes me feel alive. In the afternoon, I enjoy making DIY paper flowers or helping my mom cook traditional Vietnamese dishes. On Sunday evenings, I relax by reading English novels or playing guitar. How about you? What leisure activities do teenagers in your hometown enjoy?\n\nWrite back soon!\nNam',
        practiceTasks: [
          {
            id: 'wt8-1',
            type: 'sentence_transformation',
            prompt: 'Viết lại câu sau dùng "fond of": "Minh loves playing basketball after school." -> "Minh is ______."',
            guideVi: 'Cụm từ: is fond of + V-ing.',
            sampleAnswer: 'Minh is fond of playing basketball after school.'
          },
          {
            id: 'wt8-2',
            type: 'sentence_transformation',
            prompt: 'Viết lại câu sau dùng "prefers to": "Alex likes cycling more than running." -> "Alex prefers ______."',
            guideVi: 'prefer to-V rather than V.',
            sampleAnswer: 'Alex prefers to cycle rather than run.'
          },
          {
            id: 'wt8-3',
            type: 'sentence_combine',
            prompt: 'Nối 2 câu sau bằng "although": "He was tired. He still spent an hour building his wooden shelf."',
            guideVi: 'Dùng although chỉ sự tương phản.',
            sampleAnswer: 'Although he was tired, he still spent an hour building his wooden shelf.'
          },
          {
            id: 'wt8-4',
            type: 'error_correction',
            prompt: 'Tìm và sửa 1 lỗi sai: "Do you fancy to go swimming at the community pool this afternoon?"',
            guideVi: 'Sau fancy bắt buộc dùng V-ing (going).',
            sampleAnswer: 'Do you fancy going swimming at the community pool this afternoon?'
          },
          {
            id: 'wt8-5',
            type: 'sentence_reorder',
            prompt: 'Sắp xếp các từ thành câu hoàn chỉnh: "screen / limit / teenagers / their / should / time / every day / ."',
            guideVi: 'Chủ ngữ + should + động từ nguyên mẫu + tân ngữ.',
            sampleAnswer: 'Teenagers should limit their screen time every day.'
          }          ,
          {
            id: 'wt8-6',
            type: 'sentence_transformation',
            prompt: 'Viết lại câu dùng "keen on": "She loves cooking traditional Vietnamese dishes." -> "She is ______."',
            guideVi: 'Cấu trúc: be keen on + V-ing.',
            sampleAnswer: 'She is keen on cooking traditional Vietnamese dishes.'
          },
          {
            id: 'wt8-7',
            type: 'sentence_reorder',
            prompt: 'Sắp xếp lại: "time / free / hanging / with / friends / I / out / my / like / in / ."',
            guideVi: 'S + like + V-ing + with...',
            sampleAnswer: 'In my free time I like hanging out with my friends.'
          },
          {
            id: 'wt8-8',
            type: 'sentence_combine',
            prompt: 'Nối câu bằng "however": "He likes playing video games. He always finishes his homework first."',
            guideVi: 'Dùng tuy nhiên (however) để thể hiện sự đối lập.',
            sampleAnswer: 'He likes playing video games; however, he always finishes his homework first.'
          }
        ]
      },
      quizQuestions: [
        {
          id: 'qz8-1',
          prompt: 'Nam is very fond of ______ computer games, but he never plays for more than an hour.',
          type: 'mcq',
          options: ['play', 'playing', 'to play', 'played'],
          correctAnswer: 1,
          explanationVi: 'Cụm tính từ "fond of" (thích) đi kèm giới từ "of" nên theo sau là danh động từ V-ing => "playing".',
          category: 'Grammar'
        },
        {
          id: 'qz8-2',
          prompt: 'DIY stands for "______".',
          type: 'mcq',
          options: ['Do It Yourself', 'Do It Youth', 'Daily Important Yearly', 'Direct Internet Yard'],
          correctAnswer: 0,
          explanationVi: 'DIY là viết tắt của "Do It Yourself" (tự tay làm lấy).',
          category: 'Vocabulary'
        },
        {
          id: 'qz8-3',
          prompt: 'Which word has the main stress placed differently from the others?',
          type: 'mcq',
          options: ['balance', 'leisure', 'refreshed', 'modern'],
          correctAnswer: 2,
          explanationVi: '"refreshed" /rɪˈfreʃt/ có trọng âm rơi vào âm tiết thứ hai; "balance", "leisure", "modern" có trọng âm 1.',
          category: 'Pronunciation'
        },
        {
          id: 'qz8-4',
          prompt: 'She spends two hours every weekend ______ DIY wooden shelves for her bedroom.',
          type: 'mcq',
          options: ['make', 'making', 'to make', 'made'],
          correctAnswer: 1,
          explanationVi: 'Cấu trúc "spend time + V-ing" => "making".',
          category: 'Grammar'
        },
        {
          id: 'qz8-5',
          prompt: 'Teenagers in the countryside now have high-speed internet to learn English ______ educational apps.',
          type: 'mcq',
          options: ['through', 'across', 'under', 'between'],
          correctAnswer: 0,
          explanationVi: '"through educational apps" (thông qua các ứng dụng giáo dục).',
          category: 'Vocabulary'
        },
        {
          id: 'qz8-6',
          prompt: 'Do you fancy ______ out with us at the new youth center this Sunday?',
          type: 'mcq',
          options: ['hanging', 'to hang', 'hang', 'hung'],
          correctAnswer: 0,
          explanationVi: 'Sau "fancy", bắt buộc dùng danh động từ V-ing => "hanging".',
          category: 'Grammar'
        },
        {
          id: 'qz8-7',
          prompt: 'Cycling along the coast in the morning always makes me feel ______.',
          type: 'mcq',
          options: ['exhausted', 'refreshed', 'polluted', 'stressful'],
          correctAnswer: 1,
          explanationVi: '"refreshed" nghĩa là tràn đầy năng lượng, sảng khoái.',
          category: 'Vocabulary'
        },
        {
          id: 'qz8-8',
          prompt: 'Choose the word whose underlined part is pronounced differently:',
          type: 'mcq',
          options: ['rel<u>a</u>x', 'b<u>a</u>lance', 'h<u>a</u>ng', 'm<u>a</u>ny'],
          correctAnswer: 3,
          explanationVi: '"many" /ˈmeni/ có chữ a phát âm là /e/, các từ còn lại phát âm là /æ/.',
          category: 'Pronunciation'
        }
      ]
    }
  ],

  // LỚP 9
  9: [
    {
      unitNumber: 1,
      title: 'Unit 1: Local Community',
      descriptionVi: 'Làng nghề truyền thống, nghệ nhân địa phương, cụm động từ (phrasal verbs) và từ để hỏi trước to-infinitive.',
      grade: 9,
      vocabularies: [
        {
          id: 'v9-1',
          word: 'artisan',
          ipa: '/ˌɑːtɪˈzæn/',
          partOfSpeech: 'noun',
          meaningVi: 'nghệ nhân, thợ thủ công lành nghề',
          exampleEn: 'The skilled artisan shaped a beautiful ceramic vase on the potter\'s wheel.',
          exampleVi: 'Người nghệ nhân tài hoa đã nắn một chiếc bình gốm tuyệt đẹp trên bàn xoay.',
          topic: 'Community & Craft',
          grade: 9,
          unit: 1
        },
        {
          id: 'v9-2',
          word: 'pass down',
          ipa: '/pɑːs daʊn/',
          partOfSpeech: 'phrasal verb',
          meaningVi: 'truyền lại (qua các thế hệ)',
          exampleEn: 'These traditional embroidery skills are passed down from generation to generation.',
          exampleVi: 'Những kỹ thuật thêu truyền thống này được truyền từ thế hệ này sang thế hệ khác.',
          topic: 'Tradition',
          grade: 9,
          unit: 1
        },
        {
          id: 'v9-3',
          word: 'pottery',
          ipa: '/ˈpɒtəri/',
          partOfSpeech: 'noun',
          meaningVi: 'đồ gốm, nghề làm gốm',
          exampleEn: 'Bat Trang is widely celebrated for its centuries-old pottery craft.',
          exampleVi: 'Bát Tràng nổi tiếng khắp nơi với nghề làm gốm có lịch sử hàng thế kỷ.',
          topic: 'Crafts',
          grade: 9,
          unit: 1
        },
        {
          id: 'v9-4',
          word: 'preserve',
          ipa: '/prɪˈzɜːv/',
          partOfSpeech: 'verb',
          meaningVi: 'bảo tồn, gìn giữ',
          exampleEn: 'Young people should take active part in preserving cultural identity.',
          exampleVi: 'Giới trẻ nên chủ động tham gia vào việc gìn giữ bản sắc văn hóa.',
          topic: 'Heritage',
          grade: 9,
          unit: 1
        },
        {
          id: 'v9-5',
          word: 'live on',
          ipa: '/lɪv ɒn/',
          partOfSpeech: 'phrasal verb',
          meaningVi: 'sống dựa vào (thu nhập từ)',
          exampleEn: 'Most villagers live on making conical hats.',
          exampleVi: 'Hầu hết dân làng sống dựa vào nghề làm nón lá.',
          topic: 'Livelihood',
          grade: 9,
          unit: 1
        }
      ],
      grammar: {
        id: 'g9-1',
        title: 'Question Words Before To-Infinitives & Phrasal Verbs',
        grade: 9,
        unit: 1,
        formula: 'S + know/wonder/tell/ask + Wh-word (what, where, how, who, when) + TO-V\n(Lưu ý: Không dùng "why" trong cấu trúc này)',
        usageVi: 'Dùng cấu trúc từ để hỏi + to-infinitive để diễn tả sự phân vân, chỉ dẫn hoặc quyết định hành động.',
        signalsVi: [
          'I don\'t know what to do: Tôi không biết phải làm gì',
          'She asked where to buy authentic silk: Cô ấy hỏi nơi mua lụa tơ tằm thật'
        ],
        examples: [
          { en: 'The tourists did not know where to buy authentic lacquerware.', vi: 'Các du khách không biết nên mua đồ sơn mài chính gốc ở đâu.' },
          { en: 'My mother showed me how to make traditional mooncakes.', vi: 'Mẹ tôi đã chỉ cho tôi cách làm bánh trung thu truyền thống.' }
        ],
        commonMistakesVi: [
          'Dùng "why" trước to-infinitive (VD: "I don\'t know why to do" là SAI, cấu trúc tiếng Anh không dùng "why to-V").',
          'Quên giới từ trong cụm động từ (look after, deal with, set up, pass down).'
        ],
        practiceQuestions: [
          {
            id: 'gp9-1',
            prompt: 'Could you tell me ______ to carve a wooden block safely?',
            type: 'mcq',
            options: ['how', 'how to', 'what to', 'where to'],
            correctAnswer: 1,
            explanationVi: 'Cấu trúc "tell me + how to + V_inf" (chỉ cho tôi cách làm thế nào để...).',
            category: 'Grammar'
          },
        {
          id: 'qz8-9',
          prompt: 'Many teenagers are addicted ______ browsing social media feeds every evening.',
          type: 'mcq',
          options: ['to', 'with', 'on', 'for'],
          correctAnswer: 0,
          explanationVi: 'Cấu trúc: be addicted to + V-ing/Noun (nghiện cái gì).',
          category: 'Grammar'
        },
        {
          id: 'qz8-10',
          prompt: 'Choose the word with different sound in the underlined part: /ʊ/ vs /uː/',
          type: 'mcq',
          options: ['c<u>oo</u>k', 'b<u>oo</u>k', 'f<u>oo</u>d', 'f<u>oo</u>t'],
          correctAnswer: 2,
          explanationVi: '"food" phát âm là /uː/, còn "cook", "book", "foot" phát âm là /ʊ/.',
          category: 'Pronunciation'
        },
          {
            id: 'gp9-2',
            prompt: 'They decided to ______ a workshop to introduce bronze casting to young people.',
            type: 'mcq',
            options: ['set up', 'set off', 'look up', 'run out'],
            correctAnswer: 0,
            explanationVi: '"set up" = thành lập, mở xưởng thủ công.',
            category: 'Grammar'
          }
        ]
      },
      listening: {
        id: 'l9-1',
        title: 'Audio Tour: Discovering Bat Trang Ceramic Village',
        difficulty: 'Hard',
        grade: 9,
        unit: 1,
        audioPrompt: 'Tour guide: Good afternoon ladies and gentlemen. Welcome to Bat Trang, an ancient craft village situated on the bank of the Red River, just fourteen kilometers south-east of central Hanoi. With a history stretching back over five hundred years, Bat Trang is internationally acclaimed for its exquisite ceramics and porcelain. In this village, traditional techniques have been passed down faithfully through numerous generations of dedicated artisans. Today, visitors can not only purchase beautiful tableware and decorative ornaments, but also try their hand at shaping raw clay on a traditional potter\'s wheel under the expert guidance of local craftsmen.',
        sentences: [
          { id: 1, text: 'Welcome to Bat Trang, an ancient craft village situated on the bank of the Red River.', translationVi: 'Chào mừng quý khách đến với Bát Tràng, một làng nghề cổ kính nằm bên bờ sông Hồng.', timestamp: '0:00' },
          { id: 2, text: 'Bat Trang is internationally acclaimed for its exquisite ceramics and porcelain.', translationVi: 'Bát Tràng nổi tiếng khắp thế giới nhờ các sản phẩm gốm và sứ tinh xảo.', timestamp: '0:07' },
          { id: 3, text: 'Traditional techniques have been passed down through numerous generations.', translationVi: 'Các kỹ thuật truyền thống đã được truyền lại qua rất nhiều thế hệ.', timestamp: '0:14' },
          { id: 4, text: 'Visitors can try shaping raw clay on a potter\'s wheel under expert guidance.', translationVi: 'Du khách có thể tự tay tạo hình đất sét trên bàn xoay gốm dưới sự hướng dẫn của thợ lành nghề.', timestamp: '0:20' }
        ],
        transcriptVi: 'Hướng dẫn viên: Kính chào quý khách. Chào mừng quý khách đến với Bát Tràng, ngôi làng nghề gốm cổ nằm bên bờ sông Hồng, cách trung tâm Hà Nội 14km. Với lịch sử hơn 500 năm, Bát Tràng nổi tiếng khắp quốc tế về gốm sứ tinh xảo. Các kỹ nghệ bí truyền được truyền lại qua nhiều thế hệ nghệ nhân tận tụy. Tại đây, du khách không chỉ chiêm ngưỡng, mua sắm mà còn có thể tự tay nhào nặn đất sét trên bàn xoay gốm.',
        keywords: [
          { word: 'exquisite ceramics', ipa: '/ˈekskwɪzɪt səˈræmɪks/', meaningVi: 'đồ gốm tinh xảo' },
          { word: 'passed down', ipa: '/pɑːst daʊn/', meaningVi: 'được truyền lại' },
          { word: 'potter\'s wheel', ipa: '/ˈpɒtəz wiːl/', meaningVi: 'bàn xoay làm gốm' }
        ],
        questions: [
          {
            id: 'lq9-1',
            prompt: 'Where is Bat Trang village located?',
            type: 'mcq',
            options: ['On the bank of the Red River', 'Near the West Lake', 'In the Central Highlands', 'By Ha Long Bay'],
            correctAnswer: 0,
            explanationVi: 'Trong bài nghe: "...situated on the bank of the Red River, just fourteen kilometers south-east of central Hanoi."',
            category: 'Listening'
          },
          {
            id: 'lq9-2',
            prompt: 'What interactive activity can visitors experience in Bat Trang?',
            type: 'mcq',
            options: ['Weaving silk cloths', 'Shaping clay on a potter\'s wheel', 'Casting large bronze bells', 'Painting conical hats'],
            correctAnswer: 1,
            explanationVi: 'Trong bài nghe: "...try their hand at shaping raw clay on a traditional potter\'s wheel..."',
            category: 'Listening'
          },
          {
            id: 'lq9-3',
            prompt: 'How old is the history of Bat Trang craft village?',
            type: 'mcq',
            options: ['Over one hundred years', 'Over five hundred years', 'Fifty years', 'Over one thousand years'],
            correctAnswer: 1,
            explanationVi: 'Dẫn chứng: "With a history stretching back over five hundred years..." => Hơn 500 năm.',
            category: 'Listening'
          },
          {
            id: 'lq9-4',
            prompt: 'How far is Bat Trang from central Hanoi?',
            type: 'mcq',
            options: ['Four kilometers', 'Fourteen kilometers', 'Forty kilometers', 'One hundred kilometers'],
            correctAnswer: 1,
            explanationVi: 'Dẫn chứng: "...just fourteen kilometers south-east of central Hanoi." => 14 km.',
            category: 'Listening'
          },
          {
            id: 'lq9-5',
            prompt: 'Bat Trang is internationally acclaimed for its ______.',
            type: 'mcq',
            options: ['Modern plastic furniture', 'Exquisite ceramics and porcelain', 'Traditional conical hats', 'Silk scarves only'],
            correctAnswer: 1,
            explanationVi: 'Dẫn chứng: "...internationally acclaimed for its exquisite ceramics and porcelain."',
            category: 'Listening'
          },
          {
            id: 'lq9-6',
            prompt: 'How have traditional techniques in Bat Trang been preserved?',
            type: 'mcq',
            options: ['Passed down faithfully through numerous generations of artisans', 'Stored in digital cloud computers only', 'Bought from foreign countries', 'Forgotten by villagers'],
            correctAnswer: 0,
            explanationVi: 'Dẫn chứng: "...traditional techniques have been passed down faithfully through numerous generations of dedicated artisans."',
            category: 'Listening'
          }
        ,
          {
            id: 'lq9-7',
            prompt: 'What does the youth club organize every Saturday morning?',
            type: 'mcq',
            options: ['A community clean-up and tree planting campaign', 'A video game tournament', 'An expensive pop concert', 'A shopping tour to the mall'],
            correctAnswer: 0,
            explanationVi: 'Câu lạc bộ thanh niên tổ chức dọn dẹp môi trường và trồng cây xanh vào sáng thứ Bảy.',
            category: 'Listening'
          },
          {
            id: 'lq9-8',
            prompt: 'Volunteering in the local neighborhood strengthens community bonds.',
            type: 'true_false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanationVi: 'Hoạt động tình nguyện giúp gắn kết tình làng nghĩa xóm trong cộng đồng địa phương => True.',
            category: 'Listening'
          },]
      },
      speaking: {
        id: 's9-1',
        title: 'Presenting a Local Craft Product',
        grade: 9,
        unit: 1,
        targetSentence: 'Bat Trang ceramic products are renowned worldwide for their exquisite glaze and durability.',
        ipa: '/bɑːt trɑːŋ səˈræmɪk ˈprɒdʌkts ɑːr rɪˈnaʊnd ˌwɜːldˈwaɪd fɔːr ðeər ˈekskwɪzɪt ɡleɪz ænd ˌdjʊərəˈbɪləti/',
        stressGuide: 'Nhấn trọng âm vào: ce-RA-mic, PRO-ducts, re-NOWNED, WORLD-wide, EX-qui-site, GLAZE, du-ra-BI-li-ty.',
        meaningVi: 'Các sản phẩm gốm Bát Tràng nổi tiếng khắp thế giới nhờ lớp men tinh xảo và độ bền cao.',
        samplePrompt: 'Luyện tập phát âm với phong thái tự tin như một hướng dẫn viên du lịch giới thiệu văn hóa làng nghề Việt Nam.',
        topic: 'Culture',
        items: [
          {
            id: 'sp9-1',
            title: 'Giới thiệu gốm Bát Tràng',
            targetSentence: 'Bat Trang ceramic products are renowned worldwide for their exquisite glaze and durability.',
            ipa: '/bɑːt trɑːŋ səˈræmɪk ˈprɒdʌkts ɑːr rɪˈnaʊnd ˌwɜːldˈwaɪd fɔːr ðeər ˈekskwɪzɪt ɡleɪz ænd ˌdjʊərəˈbɪləti/',
            stressGuide: 'ce-RA-mic, PRO-ducts, re-NOWNED, EX-qui-site, du-ra-BI-li-ty.',
            meaningVi: 'Các sản phẩm gốm Bát Tràng nổi tiếng khắp thế giới nhờ lớp men tinh xảo và độ bền cao.',
            topic: 'Culture'
          },
          {
            id: 'sp9-2',
            title: 'Kỹ nghệ truyền đời',
            targetSentence: 'These intricate embroidery techniques have been passed down through five generations.',
            ipa: '/ðiːz ˈɪntrɪkət ɪmˈbrɔɪdəri tekˈniːks hæv biːn pɑːst daʊn θruː faɪv ˌdʒenəˈreɪʃnz/',
            stressGuide: 'IN-tri-cate, em-BROI-de-ry, PASSED DOWN, ge-ne-RA-tions.',
            meaningVi: 'Những kỹ thuật thêu tinh xảo này đã được truyền lại qua năm thế hệ.',
            topic: 'Heritage'
          },
          {
            id: 'sp9-3',
            title: 'Hỏi đường và chỉ dẫn',
            targetSentence: 'Could you tell me where to find the master artisan in this craft village?',
            ipa: '/kʊd juː tel miː weər tuː faɪnd ðə ˈmɑːstər ˈɑːtɪzæn ɪn ðɪs krɑːft ˈvɪlɪdʒ/',
            stressGuide: 'WHERE TO FIND, MAS-ter, AR-ti-san, CRAFT VIL-lage.',
            meaningVi: 'Bạn có thể chỉ cho tôi nơi tìm nghệ nhân bậc thầy ở làng nghề này không?',
            topic: 'Guidance'
          },
          {
            id: 'sp9-4',
            title: 'Trải nghiệm du khách',
            targetSentence: 'Tourists can try shaping raw clay on a potter\'s wheel under expert guidance.',
            ipa: '/ˈtʊərɪsts kæn traɪ ˈʃeɪpɪŋ rɔː kleɪ ɒn ə ˈpɒtəz wiːl ˈʌndər ˈekspɜːt ˈɡaɪdns/',
            stressGuide: 'TOUR-ists, SHAP-ing, CLAY, POT-ter\'s WHEEL, EX-pert.',
            meaningVi: 'Du khách có thể tự tay tạo hình đất sét trên bàn xoay gốm dưới sự hướng dẫn của thợ lành nghề.',
            topic: 'Tourism'
          },
          {
            id: 'sp9-5',
            title: 'Đề xuất giải pháp bảo tồn',
            targetSentence: 'We must combine traditional craftsmanship with modern eco-tourism to survive.',
            ipa: '/wiː mʌst kəmˈbaɪn trəˈdɪʃənl ˈkrɑːftsmənʃɪp wɪð ˈmɒdn ˈiːkəʊ ˈtʊərɪzəm tuː səˈvaɪv/',
            stressGuide: 'com-BINE, tra-DI-tion-al, CRAFTS-man-ship, ECO-tour-ism, sur-VIVE.',
            meaningVi: 'Chúng ta phải kết hợp tay nghề thủ công truyền thống với du lịch sinh thái hiện đại để phát triển bền vững.',
            topic: 'Solutions'
          },
          {
            id: 'sp9-6',
            title: 'Quảng bá sản phẩm làng nghề',
            targetSentence: 'Young designers are marketing handcrafted silk products on global e-commerce platforms.',
            ipa: '/jʌŋ dɪˈzaɪnərz ɑːr ˈmɑːkɪtɪŋ ˈhændkrɑːftɪd sɪlk ˈprɒdʌkts ɒn ˈɡləʊbl iːˈkɒmɜːs ˈplætfɔːmz/',
            stressGuide: 'de-SIGN-ers, MAR-ke-ting, HAND-craf-ted, SILK, PLAT-forms.',
            meaningVi: 'Các nhà thiết kế trẻ đang quảng bá sản phẩm lụa thủ công trên các nền tảng thương mại điện tử toàn cầu.',
            topic: 'Innovation'
          }          ,
          {
            id: 'sp9-7',
            title: 'Giới thiệu di tích địa phương',
            targetSentence: 'Our community is renowned for an ancient communal house built in the nineteenth century.',
            ipa: '/ˈaʊər kəˈmjuːnəti ɪz rɪˈnaʊnd fɔːr ən ˈeɪnʃənt kəˈmjuːnl haʊs bɪlt ɪn ðə ˌnaɪnˈtiːnθ ˈsentʃəri/',
            stressGuide: 'com-MU-ni-ty, re-NOWNED, AN-cient, com-MU-nal, NINE-teenth CEN-tu-ry.',
            meaningVi: 'Cộng đồng của chúng tôi nổi tiếng với một ngôi đình cổ được xây dựng vào thế kỷ 19.',
            topic: 'Local Community'
          },
          {
            id: 'sp9-8',
            title: 'Kêu gọi bảo vệ môi trường khu phố',
            targetSentence: 'Every resident should cooperate to keep our communal parks green, clean and beautiful.',
            ipa: '/ˈevri ˈrezɪdənt ʃʊd kəʊˈɒpəreɪt tuː kiːp ˈaʊər kəˈmjuːnl pɑːks ɡriːn kliːn ænd ˈbjuːtɪfl/',
            stressGuide: 'RES-i-dent, co-OP-er-ate, com-MU-nal PARKS, GREEN, CLEAN, BEAU-ti-ful.',
            meaningVi: 'Mỗi cư dân nên chung tay hợp tác để giữ cho các công viên công cộng luôn xanh, sạch và đẹp.',
            topic: 'Community Action'
          }
        ]
      },
      reading: {
        id: 'r9-1',
        title: 'Revitalizing Traditional Craft Villages in the 21st Century',
        grade: 9,
        unit: 1,
        wordCount: 260,
        topic: 'Heritage & Innovation',
        passage: 'Viet Nam is home to more than five thousand traditional craft villages, specializing in lacquerware, silk weaving, bamboo weaving, conical hat making, and wood carving. For centuries, these villages have not only provided dependable livelihoods for millions of rural residents but also served as the living soul of national cultural heritage. Nevertheless, contemporary artisans are confronting severe challenges, including fierce competition from mass-produced plastic goods, fluctuating material costs, and an acute shortage of young successors. Recognizing this reality, innovative younger generations of craft families are adopting creative solutions. Many villages are combining traditional craftsmanship with experiential eco-tourism, welcoming domestic and international tourists to participate directly in the production process. Furthermore, youthful designers are incorporating modern minimalist aesthetics into traditional items, marketing them effectively on global e-commerce platforms. Thanks to these energetic efforts, ancient craft villages are successfully reinventing themselves, proving that centuries-old heritage can flourish vibrantly in the modern global economy.',
        translationVi: 'Việt Nam là cái nôi của hơn năm nghìn làng nghề truyền thống chuyên về sơn mài, dệt lụa, mây tre đan, làm nón lá và điêu khắc gỗ. Suốt nhiều thế kỷ, các làng nghề này không chỉ mang lại kế sinh nhai bền vững cho hàng triệu người dân nông thôn mà còn là cái hồn sống động của di sản văn hóa dân tộc. Tuy nhiên, các nghệ nhân ngày nay đang phải đối mặt với những thách thức to lớn như sự cạnh tranh gay gắt từ hàng nhựa công nghiệp giá rẻ, giá nguyên liệu biến động và tình trạng thiếu hụt thế hệ trẻ kế nghiệp. Nhận thức rõ điều này, các thế hệ trẻ tại các làng nghề đang áp dụng những giải pháp đầy sáng tạo. Nhiều làng nghề kết hợp thủ công mỹ nghệ với du lịch sinh thái trải nghiệm, đón tiếp du khách trong và ngoài nước cùng tham gia trải nghiệm quy trình sản xuất. Hơn nữa, những nhà thiết kế trẻ đang lồng ghép phong cách thẩm mỹ tối giản hiện đại vào các sản phẩm truyền thống và quảng bá hiệu quả trên các sàn thương mại điện tử quốc tế. Nhờ những nỗ lực này, các làng nghề cổ truyền đang tự làm mới mình một cách ngoạn mục, chứng minh rằng di sản trăm năm vẫn có thể thăng hoa rực rỡ trong nền kinh tế toàn cầu.',
        vocabularyHighlights: [
          { word: 'dependable livelihoods', ipa: '/dɪˈpendəbl ˈlaɪvlihʊdz/', meaningVi: 'kế sinh nhai bền vững' },
          { word: 'successors', ipa: '/səkˈsesərz/', meaningVi: 'những người kế nghiệp' },
          { word: 'minimalist aesthetics', ipa: '/ˈmɪnɪməlɪst iːsˈθetɪks/', meaningVi: 'thẩm mỹ tối giản' }
        ],
        questions: [
          {
            id: 'rq9-1',
            prompt: 'What major challenge are traditional craft villages facing today?',
            type: 'mcq',
            options: ['A shortage of raw clay and wood worldwide', 'Competition from mass-produced goods and lack of young successors', 'Strict governmental bans on handmade crafts', 'A total absence of domestic interest in crafts'],
            correctAnswer: 1,
            explanationVi: 'Dẫn chứng: "...confronting severe challenges, including fierce competition from mass-produced plastic goods... and an acute shortage of young successors."',
            passageEvidence: 'fierce competition from mass-produced plastic goods, fluctuating material costs, and an acute shortage of young successors',
            category: 'Reading'
          },
          {
            id: 'rq9-2',
            prompt: 'How are young craft families adapting their products to modern markets?',
            type: 'mcq',
            options: ['By shutting down physical workshops', 'By combining craftsmanship with tourism and selling on e-commerce', 'By copying Western plastic designs', 'By only selling to local villagers'],
            correctAnswer: 1,
            explanationVi: 'Dẫn chứng: "combining traditional craftsmanship with experiential eco-tourism... marketing them effectively on global e-commerce platforms."',
            passageEvidence: 'combining traditional craftsmanship with experiential eco-tourism',
            category: 'Reading'
          },
          {
            id: 'rq9-3',
            prompt: 'How many traditional craft villages are there in Viet Nam according to the text?',
            type: 'mcq',
            options: ['About five hundred', 'More than five thousand', 'Exactly one hundred', 'Under two thousand'],
            correctAnswer: 1,
            explanationVi: 'Dẫn chứng: "Viet Nam is home to more than five thousand traditional craft villages..."',
            passageEvidence: 'more than five thousand traditional craft villages',
            category: 'Reading'
          },
          {
            id: 'rq9-4',
            prompt: 'The word "dependable" in the first paragraph is closest in meaning to:',
            type: 'mcq',
            options: ['Unstable', 'Reliable and steady', 'Dangerous', 'Temporary'],
            correctAnswer: 1,
            explanationVi: '"dependable" = đáng tin cậy, vững chắc, ổn định (reliable and steady).',
            category: 'Reading'
          },
          {
            id: 'rq9-5',
            prompt: 'What role do craft villages play in Vietnamese culture according to the text?',
            type: 'mcq',
            options: ['They are considered outdated and ignored', 'They serve as the living soul of national cultural heritage', 'They are only meant for senior citizens', 'They only produce items for exports'],
            correctAnswer: 1,
            explanationVi: 'Dẫn chứng: "...served as the living soul of national cultural heritage."',
            passageEvidence: 'living soul of national cultural heritage',
            category: 'Reading'
          },
          {
            id: 'rq9-6',
            prompt: 'What modern aesthetic are youthful designers incorporating into traditional crafts?',
            type: 'mcq',
            options: ['Minimalist aesthetics', 'Heavy industrial patterns', 'Cyberpunk neon effects', 'Ancient Greek architecture'],
            correctAnswer: 0,
            explanationVi: 'Dẫn chứng: "...incorporating modern minimalist aesthetics into traditional items..."',
            passageEvidence: 'modern minimalist aesthetics into traditional items',
            category: 'Reading'
          }
        ,
          {
            id: 'rq9-7',
            prompt: 'Local artisans face difficulties because young people prefer working in modern tech companies.',
            type: 'true_false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanationVi: 'Dẫn chứng: Các nghệ nhân gặp khó khăn trong việc truyền nghề vì giới trẻ chuộng công nghệ hiện đại => True.',
            category: 'Reading'
          },
          {
            id: 'rq9-8',
            prompt: 'How can local communities preserve their traditional craft villages?',
            type: 'mcq',
            options: [
              'By developing craft tourism and training young apprentices',
              'By closing all traditional workshops',
              'By banning tourists from visiting',
              'By importing machine-made items only'
            ],
            correctAnswer: 0,
            explanationVi: 'Bằng cách phát triển du lịch làng nghề và đào tạo thế hệ trẻ kế thừa.',
            category: 'Reading'
          },]
      },
      writing: {
        id: 'w9-1',
        title: 'Paragraph: Preserving a Traditional Handicraft Village',
        grade: 9,
        unit: 1,
        topicPrompt: 'Write a paragraph (100 - 120 words) proposing solutions to preserve and promote a traditional craft village in your area or in Viet Nam.',
        minWords: 95,
        maxWords: 135,
        outlineVi: [
          'Câu chủ đề: Nêu tầm quan trọng của việc gìn giữ làng nghề (Preserving traditional craft villages is crucial because...).',
          'Giải pháp 1: Kết hợp du lịch trải nghiệm (Firstly, villages should develop community-based tourism where visitors can...).',
          'Giải pháp 2: Đào tạo thế hệ trẻ kế cận (Secondly, master artisans should offer workshops to pass down their skills...).',
          'Giải pháp 3: Ứng dụng công nghệ và thương mại điện tử (Finally, young people can use digital marketing and e-commerce to...).',
          'Câu kết: Khẳng định ý nghĩa bền vững (In conclusion, these measures will ensure our traditional heritage thrives...).'
        ],
        suggestedPhrases: [
          { phrase: 'play a vital role in preserving our culture', meaningVi: 'đóng vai trò quan trọng trong gìn giữ văn hóa' },
          { phrase: 'combine craftsmanship with tourism', meaningVi: 'kết hợp tay nghề thủ công với du lịch' },
          { phrase: 'pass down valuable techniques to the youth', meaningVi: 'truyền lại kỹ thuật quý báu cho giới trẻ' },
          { phrase: 'promote unique products on social platforms', meaningVi: 'quảng bá sản phẩm độc đáo trên nền tảng số' }
        ],
        sampleEssay: 'Preserving traditional craft villages plays a vital role in safeguarding Viet Nam\'s unique cultural identity and providing sustainable jobs. To ensure these villages flourish, several practical solutions should be implemented. Firstly, local authorities ought to encourage craft tourism by designing interactive workshops where visitors can shape pottery or weave silk under the guidance of master artisans. Secondly, experienced craftsmen should pass down their time-tested techniques to young apprentices through vocational training courses. Finally, young designers can modernize traditional patterns to suit contemporary tastes and promote these exquisite products on international e-commerce platforms. By combining heritage preservation with modern innovation, our ancient craft villages will continue to prosper for generations to come.',
        practiceTasks: [
          {
            id: 'wt9-1',
            type: 'sentence_transformation',
            prompt: 'Viết lại câu sau dùng cấu trúc "how to": "They did not know what they should do to carve lacquerware." -> "They did not know ______."',
            guideVi: 'Từ để hỏi + to-infinitive.',
            sampleAnswer: 'They did not know what to do to carve lacquerware.'
          },
          {
            id: 'wt9-2',
            type: 'sentence_transformation',
            prompt: 'Viết lại câu sau dùng cụm động từ "pass down": "Ancestors handed over these weaving secrets to modern villagers." -> "These weaving secrets were ______."',
            guideVi: 'Bị động với pass down: were passed down to...',
            sampleAnswer: 'These weaving secrets were passed down to modern villagers.'
          },
          {
            id: 'wt9-3',
            type: 'sentence_combine',
            prompt: 'Nối 2 câu bằng "in order to": "Artisans modernize their designs. They want to attract younger customers."',
            guideVi: 'in order to + V_inf chỉ mục đích.',
            sampleAnswer: 'Artisans modernize their designs in order to attract younger customers.'
          },
          {
            id: 'wt9-4',
            type: 'error_correction',
            prompt: 'Tìm và sửa 1 lỗi sai: "She asked her teacher why to prepare the raw clay before molding."',
            guideVi: 'Tiếng Anh không dùng cấu trúc "why to-V", dùng "how to" hoặc "when to".',
            sampleAnswer: 'She asked her teacher how to prepare the raw clay before molding.'
          },
          {
            id: 'wt9-5',
            type: 'sentence_reorder',
            prompt: 'Sắp xếp thành câu hoàn chỉnh: "Bat Trang / famous / is / ceramics / its / worldwide / exquisite / for / ."',
            guideVi: 'Chủ ngữ + is famous worldwide for + tính từ + danh từ.',
            sampleAnswer: 'Bat Trang is famous worldwide for its exquisite ceramics.'
          }          ,
          {
            id: 'wt9-6',
            type: 'sentence_transformation',
            prompt: 'Viết lại câu dùng mệnh đề quan hệ "which": "The communal house was built in 1890. It attracts many visitors." -> "The communal house ______."',
            guideVi: 'Dùng đại từ quan hệ "which" thay thế cho danh từ chỉ vật.',
            sampleAnswer: 'The communal house which was built in 1890 attracts many visitors.'
          },
          {
            id: 'wt9-7',
            type: 'sentence_reorder',
            prompt: 'Sắp xếp lại: "heritage / preserving / cultural / responsibility / is / our / shared / ."',
            guideVi: 'Preserving cultural heritage is our shared responsibility.',
            sampleAnswer: 'Preserving cultural heritage is our shared responsibility.'
          },
          {
            id: 'wt9-8',
            type: 'sentence_combine',
            prompt: 'Nối câu bằng "in order to": "Residents sorted plastic waste. They wanted to protect the neighborhood environment."',
            guideVi: 'Dùng in order to + V_inf để chỉ mục đích.',
            sampleAnswer: 'Residents sorted plastic waste in order to protect the neighborhood environment.'
          }
        ]
      },
      quizQuestions: [
        {
          id: 'qz9-1',
          prompt: 'I have no idea ______ to contact the local artisan for the pottery workshop.',
          type: 'mcq',
          options: ['where', 'how', 'how to', 'why to'],
          correctAnswer: 2,
          explanationVi: 'Cấu trúc "how to + V_inf" (cách làm thế nào để liên hệ). Ta không dùng "why to".',
          category: 'Grammar'
        },
        {
          id: 'qz9-2',
          prompt: 'These intricate lacquerware techniques were ______ down through four generations.',
          type: 'mcq',
          options: ['passed', 'put', 'turned', 'closed'],
          correctAnswer: 0,
          explanationVi: 'Cụm động từ "pass down" nghĩa là truyền lại qua các thế hệ.',
          category: 'Vocabulary'
        },
        {
          id: 'qz9-3',
          prompt: 'Choose the word whose underlined part is pronounced differently:',
          type: 'mcq',
          options: ['<u>c</u>eramic', '<u>c</u>raft', '<u>c</u>lay', '<u>c</u>ulture'],
          correctAnswer: 0,
          explanationVi: '"ceramic" /səˈræmɪk/ có chữ "c" phát âm là /s/, trong khi "craft", "clay", "culture" phát âm là /k/.',
          category: 'Pronunciation'
        },
        {
          id: 'qz9-4',
          prompt: 'The artisan spent two weeks ______ a magnificent bronze drum.',
          type: 'mcq',
          options: ['cast', 'casting', 'to cast', 'casted'],
          correctAnswer: 1,
          explanationVi: 'Cấu trúc "spend time + V-ing" => "casting".',
          category: 'Grammar'
        },
        {
          id: 'qz9-5',
          prompt: 'Which word has the primary stress placed on the second syllable?',
          type: 'mcq',
          options: ['artisan', 'pottery', 'exquisite', 'conical'],
          correctAnswer: 2,
          explanationVi: '"exquisite" /ɪkˈskwɪzɪt/ có trọng âm rơi vào âm tiết thứ 2; "artisan", "pottery", "conical" có trọng âm 1.',
          category: 'Pronunciation'
        },
        {
          id: 'qz9-6',
          prompt: 'They had to ______ the craft shop due to the severe lack of tourists during the pandemic.',
          type: 'mcq',
          options: ['close down', 'turn off', 'pass away', 'set in'],
          correctAnswer: 0,
          explanationVi: '"close down" = đóng cửa ngừng kinh doanh.',
          category: 'Vocabulary'
        },
        {
          id: 'qz9-7',
          prompt: 'Most families in the craft village live ______ making bamboo baskets.',
          type: 'mcq',
          options: ['in', 'at', 'on', 'with'],
          correctAnswer: 2,
          explanationVi: 'Cụm động từ "live on something" (kiếm sống bằng nghề gì).',
          category: 'Grammar'
        },
        {
          id: 'qz9-8',
          prompt: 'Young designers are introducing ______ aesthetics to make traditional products look sleek and modern.',
          type: 'mcq',
          options: ['minimalist', 'polluted', 'dusty', 'noisy'],
          correctAnswer: 0,
          explanationVi: '"minimalist aesthetics" = phong cách thẩm mỹ tối giản.',
          category: 'Vocabulary'
        }
      ]
    }
  ]
};

// General Matrices for 15-minute, Mid-Term, and Final Exams
export const SAMPLE_EXAMS: ExamMatrix[] = [
  {
    id: 'exam-15m-g6',
    title: 'Kiểm tra 15 phút: Unit 1 - Grade 6',
    durationMinutes: 15,
    grade: 6,
    questionCount: 10,
    questions: [
      {
        id: 'ex6-1',
        prompt: 'Choose the word whose underlined part is pronounced differently: /ɑː/ vs /ʌ/',
        type: 'mcq',
        options: ['f<u>a</u>ther', 'cl<u>a</u>ss', 'st<u>u</u>dy', 'f<u>a</u>st'],
        correctAnswer: 2,
        explanationVi: '"study" phát âm là /ʌ/, các từ còn lại phát âm là /ɑː/.',
        category: 'Pronunciation'
      },
      {
        id: 'ex6-2',
        prompt: 'Look! The students ______ badminton in the schoolyard.',
        type: 'mcq',
        options: ['play', 'is playing', 'are playing', 'plays'],
        correctAnswer: 2,
        explanationVi: 'Dấu hiệu "Look!" => Hiện tại tiếp diễn. Danh từ số nhiều "students" dùng "are playing".',
        category: 'Grammar'
      },
        {
          id: 'qz9-9',
          prompt: 'The village artisan ______ pottery was praised by international tourists was very humble.',
          type: 'mcq',
          options: ['whose', 'whom', 'which', 'who'],
          correctAnswer: 0,
          explanationVi: '"whose pottery" thể hiện quyền sở hữu (đồ gốm của nghệ nhân).',
          category: 'Grammar'
        },
        {
          id: 'qz9-10',
          prompt: 'Choose the word with stress placed on the second syllable:',
          type: 'mcq',
          options: ['community', 'neighborhood', 'heritage', 'handicraft'],
          correctAnswer: 0,
          explanationVi: '"community" nhấn trọng âm ở âm tiết thứ 2 (/kəˈmjuːnəti/), các từ còn lại nhấn âm tiết thứ nhất.',
          category: 'Pronunciation'
        },
      {
        id: 'ex6-3',
        prompt: 'She always ______ her school bag before going to bed.',
        type: 'mcq',
        options: ['packs', 'pack', 'is packing', 'packing'],
        correctAnswer: 0,
        explanationVi: 'Trạng từ "always" + ngôi 3 số ít "She" => "packs".',
        category: 'Grammar'
      },
      {
        id: 'ex6-4',
        prompt: 'You need a ______ to draw a neat circle in geometry.',
        type: 'mcq',
        options: ['calculator', 'compass', 'pencil case', 'rubber'],
        correctAnswer: 1,
        explanationVi: '"compass" là com-pa vẽ đường tròn.',
        category: 'Vocabulary'
      },
      {
        id: 'ex6-5',
        prompt: 'At lunchtime, students eat in the school ______.',
        type: 'mcq',
        options: ['canteen', 'library', 'laboratory', 'gymnasium'],
        correctAnswer: 0,
        explanationVi: '"canteen" nghĩa là nhà ăn / căng tin của trường.',
        category: 'Vocabulary'
      },
      {
        id: 'ex6-6',
        prompt: 'My brother usually ______ judo at the sports center on Fridays.',
        type: 'mcq',
        options: ['plays', 'does', 'makes', 'has'],
        correctAnswer: 1,
        explanationVi: 'Với võ thuật (judo, karate), ta dùng động từ "do" => "does judo".',
        category: 'Vocabulary'
      },
      {
        id: 'ex6-7',
        prompt: 'We ______ in the classroom now; we are in the school garden.',
        type: 'mcq',
        options: ['aren\'t sitting', 'don\'t sit', 'not sitting', 'aren\'t sit'],
        correctAnswer: 0,
        explanationVi: 'Dấu hiệu "now" => Hiện tại tiếp diễn thể phủ định "aren\'t sitting".',
        category: 'Grammar'
      },
      {
        id: 'ex6-8',
        prompt: 'Students at a boarding school ______ and study there during the week.',
        type: 'mcq',
        options: ['live', 'travel', 'visit', 'rent'],
        correctAnswer: 0,
        explanationVi: 'Ở trường nội trú (boarding school), học sinh sống và sinh hoạt ngay tại trường.',
        category: 'Vocabulary'
      },
      {
        id: 'ex6-9',
        prompt: 'Which word has the stress on the first syllable?',
        type: 'mcq',
        options: ['uniform', 'excited', 'between', 'around'],
        correctAnswer: 0,
        explanationVi: '"uniform" /ˈjuːnɪfɔːm/ có trọng âm 1. Các từ khác có trọng âm 2.',
        category: 'Pronunciation'
      },
      {
        id: 'ex6-10',
        prompt: 'Lan is very ______. She often has creative ideas in drawing class.',
        type: 'mcq',
        options: ['creative', 'shy', 'lazy', 'strict'],
        correctAnswer: 0,
        explanationVi: '"creative" nghĩa là có óc sáng tạo.',
        category: 'Vocabulary'
      }
    ]
  },
  {
    id: 'exam-midterm-g7',
    title: 'Đề Thi Giữa Kỳ 1: Tiếng Anh Lớp 7 (GDPT 2018)',
    durationMinutes: 45,
    grade: 7,
    questionCount: 10,
    questions: [
      {
        id: 'ex7-1',
        prompt: 'My sister detests ______ dirty dishes after big family parties.',
        type: 'mcq',
        options: ['wash', 'washing', 'to wash', 'washed'],
        correctAnswer: 1,
        explanationVi: 'Sau "detest" dùng V-ing => "washing".',
        category: 'Grammar'
      },
      {
        id: 'ex7-2',
        prompt: 'Which hobby involves folding square sheets of paper into animal shapes?',
        type: 'mcq',
        options: ['Gardening', 'Origami', 'Skating', 'Pottery'],
        correctAnswer: 1,
        explanationVi: '"Origami" là nghệ thuật gấp giấy tạo hình.',
        category: 'Vocabulary'
      },
      {
        id: 'ex7-3',
        prompt: 'Choose the word with the stress on the first syllable:',
        type: 'mcq',
        options: ['patience', 'enjoy', 'prefer', 'relax'],
        correctAnswer: 0,
        explanationVi: '"patience" có trọng âm 1, các từ còn lại trọng âm 2.',
        category: 'Pronunciation'
      },
      {
        id: 'ex7-4',
        prompt: 'Eating lots of fresh vegetables and exercising daily is ______ for your health.',
        type: 'mcq',
        options: ['harmful', 'beneficial', 'useless', 'painful'],
        correctAnswer: 1,
        explanationVi: '"beneficial" = có lợi cho sức khỏe.',
        category: 'Vocabulary'
      },
      {
        id: 'ex7-5',
        prompt: 'He likes ______ outdoor sports because they keep him fit.',
        type: 'mcq',
        options: ['playing', 'to playing', 'played', 'plays'],
        correctAnswer: 0,
        explanationVi: 'Sau "likes" dùng danh động từ "playing".',
        category: 'Grammar'
      },
      {
        id: 'ex7-6',
        prompt: 'How many hours a week do you spend ______ your hobbies?',
        type: 'mcq',
        options: ['in', 'at', 'on', 'with'],
        correctAnswer: 2,
        explanationVi: 'Cấu trúc "spend time on something" (dành thời gian cho cái gì).',
        category: 'Grammar'
      },
      {
        id: 'ex7-7',
        prompt: 'To carve eggshells, you must have great ______ and very steady hands.',
        type: 'mcq',
        options: ['patience', 'laziness', 'anger', 'carelessness'],
        correctAnswer: 0,
        explanationVi: '"patience" nghĩa là lòng kiên nhẫn.',
        category: 'Vocabulary'
      },
      {
        id: 'ex7-8',
        prompt: 'My brother loves ______ old stamps from different Asian countries.',
        type: 'mcq',
        options: ['collecting', 'building', 'making', 'carving'],
        correctAnswer: 0,
        explanationVi: '"collecting stamps" = sưu tầm tem.',
        category: 'Vocabulary'
      },
      {
        id: 'ex7-9',
        prompt: 'If you want to stay healthy, you ______ drink too much sugary soda.',
        type: 'mcq',
        options: ['should', 'shouldn\'t', 'must', 'can'],
        correctAnswer: 1,
        explanationVi: '"shouldn\'t" dùng để đưa ra lời khuyên không nên làm gì có hại cho sức khỏe.',
        category: 'Grammar'
      },
      {
        id: 'ex7-10',
        prompt: 'Which word has the underlined sound pronounced as /k/?',
        type: 'mcq',
        options: ['<u>ch</u>ess', '<u>ch</u>icken', '<u>ch</u>emistry', '<u>ch</u>ildren'],
        correctAnswer: 2,
        explanationVi: '"chemistry" phát âm là /k/, các từ còn lại phát âm là /tʃ/.',
        category: 'Pronunciation'
      }
    ]
  },
  {
    id: 'exam-final-g9',
    title: 'Đề Thi Tuyển Sinh / Cuối Kỳ: Tiếng Anh Lớp 9',
    durationMinutes: 60,
    grade: 9,
    questionCount: 10,
    questions: [
      {
        id: 'ex9-1',
        prompt: 'I really do not know ______ to consult about the ancient pottery techniques.',
        type: 'mcq',
        options: ['who to', 'what to', 'why to', 'which'],
        correctAnswer: 0,
        explanationVi: '"who to consult" (tham vấn / hỏi ý kiến ai).',
        category: 'Grammar'
      },
      {
        id: 'ex9-2',
        prompt: 'These intricate embroidery patterns have been ______ down through five generations.',
        type: 'mcq',
        options: ['handed', 'passed', 'put', 'carried'],
        correctAnswer: 1,
        explanationVi: 'Cụm từ "passed down" nghĩa là truyền lại qua các thế hệ.',
        category: 'Vocabulary'
      },
      {
        id: 'ex9-3',
        prompt: 'The artisan spent two weeks ______ a magnificent bronze bell.',
        type: 'mcq',
        options: ['cast', 'casting', 'to cast', 'casted'],
        correctAnswer: 1,
        explanationVi: 'Cấu trúc "spend time + V-ing" => "casting".',
        category: 'Grammar'
      },
      {
        id: 'ex9-4',
        prompt: 'Choose the word with the primary stress placed differently from the others:',
        type: 'mcq',
        options: ['artisan', 'pottery', 'conical', 'exquisite'],
        correctAnswer: 3,
        explanationVi: '"exquisite" /ɪkˈskwɪzɪt/ có trọng âm 2; "artisan", "pottery", "conical" có trọng âm 1.',
        category: 'Pronunciation'
      },
      {
        id: 'ex9-5',
        prompt: 'We decided to ______ early to avoid the heavy weekend traffic.',
        type: 'mcq',
        options: ['set off', 'set up', 'set in', 'set down'],
        correctAnswer: 0,
        explanationVi: '"set off" = khởi hành lên đường.',
        category: 'Vocabulary'
      },
      {
        id: 'ex9-6',
        prompt: 'They had to ______ the historical workshop due to lack of funds.',
        type: 'mcq',
        options: ['close down', 'turn off', 'break in', 'pass away'],
        correctAnswer: 0,
        explanationVi: '"close down" = đóng cửa ngừng hoạt động.',
        category: 'Vocabulary'
      },
      {
        id: 'ex9-7',
        prompt: 'She asked her teacher ______ to write a formal application letter.',
        type: 'mcq',
        options: ['how', 'how to', 'what', 'which'],
        correctAnswer: 1,
        explanationVi: 'Cấu trúc "how to + V_inf" chỉ cách làm.',
        category: 'Grammar'
      },
      {
        id: 'ex9-8',
        prompt: 'Bat Trang is well-known ______ its unique porcelain glaze.',
        type: 'mcq',
        options: ['for', 'about', 'with', 'in'],
        correctAnswer: 0,
        explanationVi: 'Cụm tính từ "well-known for" (nổi tiếng vì điều gì).',
        category: 'Grammar'
      },
      {
        id: 'ex9-9',
        prompt: 'Traditional crafts provide dependable ______ for rural residents.',
        type: 'mcq',
        options: ['livelihoods', 'entertainments', 'vehicles', 'attractions'],
        correctAnswer: 0,
        explanationVi: '"livelihoods" = kế sinh nhai, nguồn thu nhập nuôi sống gia đình.',
        category: 'Vocabulary'
      },
      {
        id: 'ex9-10',
        prompt: 'The young designer incorporated ______ aesthetics into traditional conical hats.',
        type: 'mcq',
        options: ['minimalist', 'polluted', 'boring', 'artificial'],
        correctAnswer: 0,
        explanationVi: '"minimalist aesthetics" = phong cách thẩm mỹ tối giản.',
        category: 'Vocabulary'
      }
    ]
  }
];
