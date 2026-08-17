import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

function readJson(path) {
  return JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'));
}

const feelings = readJson('../src/data/feelings.json');
const nested = readJson('../src/data/duas_by_feeling.json');
const flat = readJson('../src/data/duas_flat.json');
const arabicTitles = readJson('../src/data/dua_titles_ar.json');

test('generated datasets agree on counts and slugs', () => {
  const nestedCount = nested.feelings.reduce(
    (total, group) => total + group.duas.length,
    0,
  );
  const slugs = nested.feelings.map((group) => group.slug);

  assert.equal(feelings.length, nested.feelings.length);
  assert.equal(nested.total_items, nestedCount);
  assert.equal(flat.length, nestedCount);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.ok(slugs.includes('suicidal'));

  for (const group of nested.feelings) {
    assert.equal(group.items_count, group.duas.length, group.slug);
  }
});

test('every dua has Arabic text, a source URL, and a reviewed Arabic title', () => {
  const uniqueTitles = new Set(flat.map((dua) => dua.title));

  for (const dua of flat) {
    assert.match(dua.arabic, /[\u0600-\u06FF]/, dua.title);
    assert.match(dua.source_url, /^https:\/\//, dua.title);
    assert.ok(arabicTitles[dua.title], `Missing Arabic title: ${dua.title}`);
  }

  assert.equal(Object.keys(arabicTitles).length, uniqueTitles.size);
  for (const [englishTitle, arabicTitle] of Object.entries(arabicTitles)) {
    assert.match(arabicTitle, /[\u0600-\u06FF]/, englishTitle);
    assert.doesNotMatch(arabicTitle, /[A-Za-z]/, englishTitle);
  }
});

test('the normalized search model has one entry per unique dua', () => {
  const uniqueDuas = new Set(
    flat.map((dua) => `${dua.title}\u0000${dua.arabic ?? ''}`),
  );

  assert.equal(uniqueDuas.size, 131);
  assert.equal(flat.length, 305);
});

test('every dua context has an Arabic source text', () => {
  const manualContexts = {
    'Istiʿadhah #1':
      'قال الله تعالى: فإذا قرأت القرآن فاستعذ بالله من الشيطان الرجيم.',
    'Ayat al-Kursi in the Morning':
      'عن أبي بن كعب رضي الله عنه أن النبي ﷺ قال في آية الكرسي: من قالها حين يصبح أُجير من الجن حتى يمسي، ومن قالها حين يمسي أُجير منهم حتى يصبح.',
    'Morning Remembrance of Dominion':
      'عن عبد الله بن مسعود رضي الله عنه قال: كان نبي الله ﷺ إذا أصبح قال: أصبحنا وأصبح الملك لله والحمد لله لا إله إلا الله وحده لا شريك له.',
    'Morning Supplication for Knowledge, Provision, and Accepted Deeds':
      'عن أم سلمة رضي الله عنها أن النبي ﷺ كان يقول إذا صلى الصبح حين يسلم: اللهم إني أسألُك علماً نافعاً، ورزقاً طيباً، وعملاً متقبلاً.',
    'Sayyid al-Istighfar (Master of Forgiveness)':
      'عن شداد بن أوس رضي الله عنه عن النبي ﷺ قال: سيد الاستغفار أن يقول العبد: اللهم أنت ربي لا إله إلا أنت... ومن قالها من النهار موقناً بها فمات من يومه قبل أن يمسي فهو من أهل الجنة.',
    'Supplication for Well-being in Body and Hearing':
      'عن عبد الرحمن بن أبي بكرة رضي الله عنه أنه قال لأبيه: يا أبت إني أسمعك تدعو كل غداة: اللهم عافني في بدني، اللهم عافني في سمعي، اللهم عافني في بصري.',
    'Seeking Succor through Allah\'s Mercy':
      'عن أنس بن مالك رضي الله عنه قال: قال النبي ﷺ لفاطمة رضي الله عنها: ما يمنعك أن تسمعي ما أوصيك به أن تقولي إذا أصبحت وإذا أمسيت: يا حي يا قيوم برحمتك أستغيث.',
    'Evening Remembrance of Dominion':
      'عن عبد الله بن مسعود رضي الله عنه قال: كان نبي الله ﷺ إذا أمسى قال: أمسينا وأمسى الملك لله والحمد لله لا إله إلا الله وحده لا شريك له.',
    'Seeking Protection in Allah\'s Perfect Words':
      'عن أبي هريرة رضي الله عنه أنه قال: جاء رجل إلى النبي ﷺ فقال: يا رسول الله ما لقيت من عقرب لدغتني البارحة، قال: أما لو قلت حين أمسيت: أعوذ بكلمات الله التامات من شر ما خلق لم تضرك.',
    'Shielding against Harm in Earth and Heaven':
      'عن عثمان بن عفان رضي الله عنه قال: قال رسول الله ﷺ: ما من عبد يقول في صباح كل يوم ومساء كل ليلة: بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم ثلاث مرات لم يضره شيء.',
    'Contentment with Allah as Lord and Islam as Religion':
      'عن المنيذر رضي الله عنه صاحب رسول الله ﷺ قال: سمعت رسول الله ﷺ يقول: من قال إذا أصبح رضيت بالله رباً وبالإسلام ديناً وبمحمد نبياً فأنا الزعيم لأخذن بيده حتى أدخله الجنة.',
    'Dua upon Waking Up from Sleep':
      'عن حذيفة بن اليمان رضي الله عنه قال: كان النبي ﷺ إذا أراد أن ينام وضع يده تحت خده وقال باسمك اللهم أموت وأحيا وإذا استيقظ قال الحمد لله الذي أحيانا بعد ما أماتنا وإليه النشور.',
    'Protection from the Punishment on the Day of Resurrection':
      'عن حذيفة رضي الله عنه أن النبي ﷺ كان إذا أراد أن ينام وضع يده تحت خده الأيمن ثم قال: اللهم قني عذابك يوم تبعث عبادك ثلاث مرات.',
    'Dua Before Entering the Lavatory':
      'عن أنس بن مالك رضي الله عنه قال: كان النبي ﷺ إذا أراد دخول الخلاء قال: اللهم إني أعوذ بك من الخبث والخبائث ليعصمه الله من الشيطان والخبيث.',
    'Dua Upon Leaving the Lavatory':
      'عن عائشة رضي الله عنها قالت: كان النبي ﷺ إذا خرج من الخلاء قال غفرانك استغفاراً لله وسؤالاً لرحمته ومغفرته بعد قضاء الحاجة.',
    'Tasbih, Tahmid, and Takbir After Obligatory Prayer':
      'عن أبي هريرة رضي الله عنه عن رسول الله ﷺ قال: من سبح الله في دبر كل صلاة ثلاثاً وثلاثين، وحمد الله ثلاثاً وثلاثين، وكبر الله ثلاثاً وثلاثين، فتلك تسعة وتسعون، وقال تمام المائة: لا إله إلا الله وحده لا شريك له له الملك وله الحمد وهو على كل شيء قدير، غفرت خطاياه وإن كانت مثل زبد البحر.',
    'Supplication Immediately After Taslim':
      'عن ثوبان رضي الله عنه أن رسول الله ﷺ كان إذا فرغ من صلاته استغفر الله ثلاثاً وقال اللهم أنت السلام ومنك السلام تباركت يا ذا الجلال والإكرام.',
    'Supplication for Help in Remembering and Worshipping Allah':
      'عن معاذ بن جبل رضي الله عنه أن رسول الله ﷺ أخذ بيده وقال: يا معاذ والله إني لأحبك، ثم أوصيك يا معاذ لا تدعن في دبر كل صلاة تقول: اللهم أعني على ذكرك وشكرك وحسن عبادتك.',
    'Supplication for Easing Difficulty in Study and Exams':
      'عن أنس بن مالك رضي الله عنه أن رسول الله ﷺ قال: اللهم لا سهل إلا ما جعلته سهلاً، وأنت تجعل الحزن إذا شئت سهلاً.',
    'Quranic Prayer for Increase in Beneficial Knowledge':
      'قال الله تعالى في سورة طه لنبيه محمد ﷺ آمراً له بالسؤال والطلب للزيادة في العلم النافع: ﴿وَقُل رَّبِّ زِدْنِي عِلْمًا﴾. (سورة طه: ١١٤)',
    'Quranic Supplication for Expanding the Chest and Comprehension':
      'قال الله تعالى عن موسى عليه السلام يدعو ربه بالإنشراح والتيسير وإطلاق اللسان بالبيان والفهم: ﴿رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي يَفْقَهُوا قَوْلِي﴾. (سورة طه: ٢٥-٢٨)',
    'Supplication for Mounting a Means of Transport':
      'قال الله تعالى: ﴿لِتَسْتَوُوا عَلَى ظُهُورِهِ ثُمَّ تَذْكُرُوا نِعْمَةَ رَبِّكُمْ إِذَا اسْتَوَيْتُمْ عَلَيْهِ وَتَقُولُوا سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنقَلِبُونَ﴾. (سورة الزخرف: ١٣-١٤)',
    'Supplication of the Traveler for Those Left Behind':
      'عن أبي هريرة رضي الله عنه قال: ودعني رسول الله ﷺ فقال أستودعك الله الذي لا تضيع ودائعه، وهو دعاء الخروج والسفر وحفظ الأهل والمال والخلف.',
    'Supplication Upon Returning from Travel':
      'عن ابن عمر رضي الله عنهما أن رسول الله ﷺ كان إذا قفل من جيش أو سرية أو حج أو عمرة كبر على كل شرف من الأرض ثلاث تكبيرات ثم قال: آيبون تائبون عابدون ساجدون لربنا حامدون.',
    'Prayer of the Prophet for Healing the Sick':
      'عن ابن عباس رضي الله عنهما عن النبي ﷺ قال: ما من عبد مسلم يعود مريضاً لم يحضر أجله فيقول عنده سبع مرار: أسأل الله العظيم رب العرش العظيم أن يشفيك إلا عوفا.',
    'Ruqyah with Surah al-Ikhlas, al-Falaq, and an-Nas':
      'عن عائشة رضي الله عنها أن النبي ﷺ كان إذا أوى إلى فراشه كل ليلة جمع كفيه ثم نفث فيهما فقرأ فيهما: قل هو الله أحد وقل أعوذ برب الفلق وقل أعوذ برب الناس ثم يمسح بهما ما استطاع من جسده.',
    'Supplication for Relief from Pain':
      'عن عثمان بن أبي العاص الثقفي رضي الله عنه أنه شكى إلى رسول الله ﷺ وجعاً يجده في جسده منذ أسلم، فقال له رسول الله ﷺ: ضع يدك على الذي يأتلم من جسدك وقل باسم الله ثلاثاً وقل سبع مرات أعوذ بالله وقدرته من شر ما أجد وأحاذر.',
    'Supplication for Halal Sustenance and Freedom from Debt':
      'عن علي رضي الله عنه أن مكاتباً جاءه فقال: إني عجزت عن كتابتي فأعني، قال: ألا أعلمك كلمات علمنيهن رسول الله ﷺ لو كان عليك مثل جبل ثبير ديناً أداه الله عنك؟ قل: اللهم اكفني بحلالك عن حرامك وأغنني بفضلك عمن سواك.',
    'Supplication of Prophet Yunus (Dhul-Nun) for Relief':
      'عن سعد بن أبي وقاص رضي الله عنه قال: قال رسول الله ﷺ: دعوة ذي النون إذ دعا وهو في بطن الحوت: لا إله إلا أنت سبحانك إني كنت من الظالمين، فإنه لم يدع بها رجل مسلم في شيء قط إلا استجاب الله له.',
    'Supplication of Prophet Musa for Sustenance':
      'قال الله تعالى عن موسى عليه السلام لما ورد ماء مدين: ﴿رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ﴾. (سورة القصص: ٢٤)',
    'Supplication Against Worry, Debt, and Oppression':
      'عن أنس بن مالك رضي الله عنه قال: كنت أخدم رسول الله ﷺ فكنت أسمعه يكثر أن يقول: اللهم إني أعوذ بك من الهم والحزن والعجز والكسل والجبن والبخل وضلع الدين وغلبة الرجال.',
  };
  const uniqueContexts = new Map();

  for (const dua of flat.filter((item) => item.hadith || item.virtue)) {
    const [primaryArabic, ...embeddedLines] = dua.arabic.split(/\r?\n/);
    const key = `${dua.title}\u0000${primaryArabic.trim()}`;
    const arabicReference = (dua.reference || '')
      .split(/\r?\n/)
      .filter((line) => /[\u0600-\u06FF]/.test(line))
      .join('\n')
      .trim();
    const candidates = [
      (dua.hadith || ''),
      (dua.virtue || ''),
      arabicReference,
      embeddedLines.join('\n').trim(),
      manualContexts[dua.title] || '',
    ].filter(
      (value) => value.replace(/[^\u0621-\u064A]/g, '').length >= 45,
    );
    const bestContext = candidates.sort((a, b) => b.length - a.length)[0];
    const existing = uniqueContexts.get(key);

    if (bestContext && (!existing || bestContext.length > existing.length)) {
      uniqueContexts.set(key, bestContext);
    } else if (!uniqueContexts.has(key)) {
      uniqueContexts.set(key, '');
    }
  }

  assert.equal(uniqueContexts.size, 112);
  for (const [key, context] of uniqueContexts) {
    assert.ok(context, `Missing Arabic context: ${key.split('\u0000')[0]}`);
    assert.match(context, /[\u0600-\u06FF]/, key);
    assert.doesNotMatch(context, /[A-Za-z]/, key);
  }
});
