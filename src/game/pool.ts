export interface Question {
  /**
   * Optional set-up read before the question itself — the flavour line that
   * frames it. Rendered smaller and quieter than `q` so the actual question
   * still lands at display size.
   */
  lead?: string;
  q: string;
  /**
   * Optional photo shown beside the question, served from `public/`. Pick art
   * that sets the scene without giving the answer away — the whole room sees it
   * for the full sixty seconds.
   */
  img?: string;
  a: string;
}

export interface Category {
  id: string;
  title: string;
  sub: string;
  ink: number;
  qs: Question[];
}

/**
 * `lead` and `q` accept inline markup: `**bold**` for emphasis the host should
 * lean on, `*italics*` for titles of films, songs and series. See `RichText`.
 *
 * The first six categories are Pack 01 — real content, one per ink so a board
 * drafted entirely from the pack uses all six colours. The rest still carry
 * placeholder questions, awaiting packs of their own.
 */
export const POOL: Category[] = [
  // ── Pack 01 ────────────────────────────────────────────────────────────────
  { id: 'cine', title: 'El Cinema2i', sub: 'Films, stars and the lines everyone quotes', ink: 0, qs: [
    {
      lead: 'Nefta7 b easy one.',
      q: 'Who played **El Limby**?',
      a: 'Mohamed Saad' },
    {
      lead: 'In *El Irhab Wel Kabab*, Adel Imam goes out to do the most dangerous activity known to Egyptians: **finish paperwork**.',
      q: 'Which Cairo building does he go to?',
      a: 'Mogamma El Tahrir' },
    {
      lead: 'Ahmed Helmy plays triplets pretending to be one person in *Keda Reda*.',
      q: 'Name **all three brothers**.',
      a: 'El Prince, Bibo and Semsem' },
    {
      lead: 'In *X Large*, Magdy thinks things with his childhood friend Dina might finally be going well. Very optimistic of him.',
      q: 'What does he discover she has actually been using him for?',
      img: '/questions/film.svg',
      a: 'A case for her university research' },
    {
      q: 'Before directing some of Egypt’s biggest modern films, which Egyptian director worked as an **assistant director on El Nazer**?',
      a: 'Marwan Hamed' },
    {
      lead: 'No actors this time.',
      q: 'Name the **writer and director** behind *El Irhab Wel Kabab*.',
      a: 'Wahid Hamed (writer) and Sherif Arafa (director)' } ] },

  { id: 'kora', title: 'Kora Masry', sub: 'Ahly, Zamalek and the national team', ink: 1, qs: [
    {
      lead: '2020. Al Ahly vs Zamalek. “Final of the Century.” 1–1, and extra time is getting ready to ruin everyone’s blood pressure.',
      q: 'Who scored Al Ahly’s **86th-minute winner**?',
      a: 'Mohamed Magdy Afsha' },
    {
      lead: '2002. Ahly 6–1 Zamalek. Khaled Bebo personally made sure this match would be mentioned at family gatherings forever.',
      q: 'How many of Ahly’s six goals did he score?',
      a: 'Four' },
    {
      lead: 'Zamalek was founded in 1911 — but it wasn’t originally called Zamalek.',
      q: 'What was the club’s **first name**?',
      a: 'Qasr El Nil Club' },
    {
      lead: 'Ahly and Zamalek can relax for one question.',
      q: 'Which Egyptian club became the **first Egyptian side to conquer Africa’s top club competition**, winning it in 1969?',
      a: 'Ismaily' },
    {
      lead: 'Egypt didn’t just win AFCON three times in a successful era. They won it **three editions in a row**.',
      q: 'Name all three years.',
      a: '2006, 2008 and 2010' },
    {
      lead: 'Two Egyptian players share the AFCON record with **four tournament titles each as players**.',
      q: 'Name both.',
      a: 'Ahmed Hassan and Essam El Hadary' } ] },

  { id: 'ma3loomat', title: 'Ma3loomat 3amma', sub: 'General knowledge, no excuses', ink: 2, qs: [
    {
      q: 'Which planet is known as the **Red Planet**?',
      a: 'Mars' },
    {
      lead: 'And no, we’re not accepting “the heart because I love deeply.”',
      q: 'What is the **largest organ in the human body**?',
      a: 'The skin' },
    {
      lead: 'Flying squirrels are frauds. They only glide.',
      q: 'What is the **only mammal capable of true powered flight**?',
      a: 'The bat' },
    {
      lead: 'You’re asked for the **largest desert on Earth**. You say Sahara because obviously. You are wrong.',
      q: 'What is it?',
      a: 'Antarctica' },
    {
      lead: 'Mercury is closest to the Sun, bas apparently Venus said: **“Ana el a7ar.”**',
      q: 'Which planet is actually the **hottest in the Solar System**?',
      a: 'Venus' },
    {
      lead: 'Every country’s flag is basically some version of a rectangle… except one.',
      q: 'Which country has the world’s **only non-rectangular national flag**?',
      a: 'Nepal' } ] },

  { id: 'akl', title: 'Akl El Beit', sub: 'Home cooking and what is on the table', ink: 3, qs: [
    {
      q: 'Which green dish has basically every Egyptian household convinced that **their** version is the correct one?',
      a: 'Molokhia' },
    {
      lead: 'Rice. Lentils. Macaroni. Chickpeas. Tomato sauce. Crispy onions. A dish looked at every carb in the kitchen and said **“aywa, kollo.”**',
      q: 'What are we eating?',
      a: 'Koshari' },
    {
      lead: 'That garlic-and-coriander mixture sizzling in ghee right before it hits the molokhia has a name.',
      q: 'What is it?',
      a: 'Ta2leya' },
    {
      lead: 'Wara2 3enab, kousa, kromb, eggplant — the vegetable keeps changing, but traditional Egyptian **mahshi** keeps coming back to one main filling.',
      q: 'What is it?',
      a: 'Seasoned rice' },
    {
      lead: 'Egyptian ta’ameya has a very important difference from the chickpea falafel common elsewhere in the region.',
      q: 'What legume is Egyptian ta’ameya traditionally based on?',
      a: 'Fava beans (fool)' },
    {
      lead: 'Koshari is thoroughly Egyptian now, bas its ancestry is commonly linked to the Indian dish **khichdi**.',
      q: 'What two staple ingredients form the basic combination behind khichdi?',
      a: 'Rice and lentils' } ] },

  { id: 'tofoola', title: 'Ayam El Tofoola', sub: 'Bakkar, Spacetoon and the Ramadan of your childhood', ink: 4, qs: [
    {
      lead: 'Bakkar had one companion who honestly deserved her own spin-off.',
      q: 'What was the name of his goat?',
      a: 'Rashida' },
    {
      lead: 'You hear the opening of *Bakkar*. Ramadan memory unlocked immediately.',
      q: 'Which Egyptian singer performed the famous theme?',
      a: 'Mohamed Mounir' },
    {
      q: 'Which Egyptian snack brand launched in **1997** and basically helped turn the packaged croissant into a school-bag food group?',
      a: 'Molto' },
    {
      lead: 'Spacetoon didn’t have “genres.” It had **planets**, because apparently normal television organization was too boring.',
      q: 'Which planet was home to the sports shows?',
      a: 'Kawkab Riyada (Sport Planet)' },
    {
      lead: 'Before TikTok challenges, Egyptian Ramadan had **Fawazeer**.',
      q: 'Name the **two female stars** most famously associated with the classic 1980s–90s Fawazeer era.',
      a: 'Nelly and Sherihan' },
    {
      lead: 'Let’s see who’s representing the older side of the room.',
      q: '*Boogie w Tamtam* first arrived on Egyptian television during Ramadan in what year?',
      a: '1983' } ] },

  { id: 'agh', title: 'Aghani Zaman', sub: 'Old songs and the voices behind them', ink: 5, qs: [
    {
      lead: 'If someone says **Kawkab El Sharq** and your teta sees you hesitating, you’ve already disappointed her.',
      q: 'Who are they talking about?',
      a: 'Umm Kulthum' },
    {
      q: 'Who was known across Egypt and the Arab world as **El Andaleeb El Asmar**?',
      a: 'Abdel Halim Hafez' },
    {
      q: 'Which Egyptian singer and actress gave us the patriotic classic **Ya Habibti Ya Masr**?',
      a: 'Shadia' },
    {
      q: '*Enta Omri* marked the beginning of a historic collaboration between Umm Kulthum and which legendary Egyptian composer?',
      img: '/questions/oud.svg',
      a: 'Mohamed Abdel Wahab' },
    {
      lead: 'Traditionalists raised an eyebrow when *Enta Omri* introduced a distinctly modern sound into Umm Kulthum’s orchestra.',
      q: 'Which instrument opens the recording with its famous riff?',
      a: 'The electric guitar' },
    {
      lead: 'One for the team that somehow has both a Warda fan **and** an Aaliyah fan.',
      q: 'Which Warda classic was sampled in Aaliyah’s *Don’t Know What to Tell Ya* — and decades later appeared in *Moon Knight*?',
      a: 'Batwanes Beek' } ] },

  // ── Placeholder categories, each still awaiting a pack ─────────────────────
  { id: 'kalam', title: 'Kalam El 3ela', sub: 'Household sayings, habits and house rules', ink: 2, qs: [
    { q: 'What do you say to someone who has just had a haircut or a bath?', a: 'Na’eeman' },
    { q: 'Who in the family is traditionally asked to settle an argument?', a: 'The eldest' },
    { q: 'What is the standard reply to “shukran”?', a: 'Al ‘afw' },
    { q: 'What do guests bring when invited to dinner?', a: 'Sweets' },
    { q: 'What is the word for the visit paid to a family after good news?', a: 'Mabrouk visit' },
    { q: 'Who traditionally pours the tea for the room?', a: 'The youngest' } ] },
  { id: 'masr', title: 'Masr Fein?', sub: 'Places, roads and where things are', ink: 5, qs: [
    { q: 'Which river runs through Cairo?', a: 'The Nile' },
    { q: 'Which sea lies to the north of Egypt?', a: 'The Mediterranean' },
    { q: 'Which canal links the Mediterranean to the Red Sea?', a: 'The Suez Canal' },
    { q: 'What is the capital of Egypt?', a: 'Cairo' },
    { q: 'Which city sits at the western end of the Nile Delta on the coast?', a: 'Alexandria' },
    { q: 'What is the name of the large lake formed behind the Aswan High Dam?', a: 'Lake Nasser' } ] },
  { id: 'mos', title: 'Mosalsalat', sub: 'Series, seasons and the Ramadan slate', ink: 1, qs: [
    { q: 'How many episodes does a standard Ramadan series usually run?', a: 'Thirty' },
    { q: 'What is the word for one instalment of a series?', a: 'An episode' },
    { q: 'What is the opening sequence of a series called?', a: 'The titles' },
    { q: 'A series that continues the same story a year later is called what?', a: 'A second season' },
    { q: 'What is the term for the very last episode?', a: 'The finale' },
    { q: 'What is the person who writes the series called?', a: 'The screenwriter' } ] },
  { id: 'sa7', title: 'Sa7 wala Ghalat', sub: 'True or false, no half marks', ink: 3, qs: [
    { q: 'True or false: the Nile flows south to north.', a: 'True' },
    { q: 'True or false: a camel stores water in its hump.', a: 'False — it stores fat' },
    { q: 'True or false: Arabic is written right to left.', a: 'True' },
    { q: 'True or false: the Sahara is the largest hot desert on earth.', a: 'True' },
    { q: 'True or false: sound travels faster in water than in air.', a: 'True' },
    { q: 'True or false: a tomato is botanically a fruit.', a: 'True' } ] },
  { id: 'sana', title: 'Ay Sana?', sub: 'Name the year, nearest guess takes it', ink: 2, qs: [
    { q: 'In which year did the twentieth century begin?', a: '1901' },
    { q: 'In which year did the first people land on the moon?', a: '1969' },
    { q: 'In which year did the Second World War end?', a: '1945' },
    { q: 'In which year was the Suez Canal opened?', a: '1869' },
    { q: 'In which year was the tomb of Tutankhamun found?', a: '1922' },
    { q: 'In which year was the Aswan High Dam completed?', a: '1970' } ] },
  { id: 'kelma', title: 'Kelma Kelma', sub: 'Words, letters and one-word answers', ink: 0, qs: [
    { q: 'How many letters are in the Arabic alphabet?', a: 'Twenty-eight' },
    { q: 'What is a word that reads the same forwards and backwards called?', a: 'A palindrome' },
    { q: 'What is the term for two words that sound alike but differ in meaning?', a: 'Homophones' },
    { q: 'What do you call the three-letter core that Arabic words are built from?', a: 'The root' },
    { q: 'What is the name for a word borrowed unchanged from another language?', a: 'A loanword' },
    { q: 'What is the word for a saying the whole family repeats?', a: 'A proverb' } ] },
  { id: 'farah', title: 'Gawaz w Farah', sub: 'Weddings, engagements and the whole procession', ink: 4, qs: [
    { q: 'What is the name of the procession that walks the couple in?', a: 'The zaffa' },
    { q: 'What is the word for the engagement party?', a: 'Khotouba' },
    { q: 'Who traditionally holds the rings before the ceremony?', a: 'The best man' },
    { q: 'What is the sweet drink served at engagements?', a: 'Sharbat' },
    { q: 'What is the written marriage contract called?', a: 'Katb el kitab' },
    { q: 'What do guests do with the bouquet at the end of the night?', a: 'Catch it' } ] },
  { id: 'share3', title: 'El Share3', sub: 'Getting around, and what it costs', ink: 5, qs: [
    { q: 'What is the shared minibus most people take called?', a: 'A microbus' },
    { q: 'How many lines does the Cairo metro run?', a: 'Three' },
    { q: 'What do you call the person who collects the fare on a bus?', a: 'The conductor' },
    { q: 'What is the three-wheeled vehicle used in narrow streets?', a: 'A tuk-tuk' },
    { q: 'What is the word for the roadside kiosk selling everything?', a: 'A kushk' },
    { q: 'What colour are Cairo taxis?', a: 'White' } ] },
  { id: 'beit', title: 'Fi El Beit', sub: 'Objects, rooms and how the house works', ink: 2, qs: [
    { q: 'What is the covered balcony room called?', a: 'A veranda' },
    { q: 'What do you call the tall glass used for tea?', a: 'A kobbaya' },
    { q: 'What is the small copper pot for making coffee called?', a: 'A kanaka' },
    { q: 'What is the name for the roof-level water tank?', a: 'A khazan' },
    { q: 'What do you call the fold-down guest bed?', a: 'A sofa bed' },
    { q: 'What is the room kept tidy only for guests called?', a: 'The salon' } ] },
  { id: 'raqam', title: 'Raqam Kam?', sub: 'Numbers, prices and how many', ink: 3, qs: [
    { q: 'How many governorates does Egypt have?', a: 'Twenty-seven' },
    { q: 'How many days are in a lunar year?', a: '354' },
    { q: 'How many players are in a volleyball team on court?', a: 'Six' },
    { q: 'How many pyramids stand on the Giza plateau?', a: 'Three' },
    { q: 'How many strings does an oud usually have?', a: 'Eleven' },
    { q: 'How many hours ahead of GMT is Cairo in winter?', a: 'Two' } ] }
];

export const byId = (id: string): Category => {
  const cat = POOL.find((p) => p.id === id);
  if (!cat) throw new Error(`Unknown category id: ${id}`);
  return cat;
};
