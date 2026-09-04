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
  /**
   * Where the answer was verified. Never rendered — it is here so a disputed
   * call at the table can be settled, and so a question can be re-checked years
   * later without redoing the research.
   */
  src?: string;
}

export interface Category {
  id: string;
  title: string;
  sub: string;
  ink: number;
  /**
   * Six tiers, 100 through 600. Each tier holds one or more interchangeable
   * questions; a board draws one variant per tier when it opens, so a category
   * with six variants a tier plays six times before anything repeats. Tiers with
   * a single entry simply always show it.
   */
  qs: Question[][];
}

/**
 * `lead` and `q` accept inline markup: `**bold**` for emphasis the host should
 * lean on, `*italics*` for titles of films, songs and series. See `RichText`.
 *
 * The first six categories are real content. The rest still carry placeholder
 * questions, awaiting packs of their own.
 */
export const POOL: Category[] = [
  // ── Pack 01 ────────────────────────────────────────────────────────────────
  { id: 'cine', title: 'El Cinema2i', sub: 'Films, stars and the lines everyone quotes', ink: 0, qs: [
    [{ lead: 'Nefta7 b easy one.',
       q: 'Who played **El Limby**?',
       a: 'Mohamed Saad' }],
    [{ lead: 'In *El Irhab Wel Kabab*, Adel Imam goes out to do the most dangerous activity known to Egyptians: **finish paperwork**.',
       q: 'Which Cairo building does he go to?',
       a: 'Mogamma El Tahrir' }],
    [{ lead: 'Ahmed Helmy plays triplets pretending to be one person in *Keda Reda*.',
       q: 'Name **all three brothers**.',
       a: 'El Prince, Bibo and Semsem' }],
    [{ lead: 'In *X Large*, Magdy thinks things with his childhood friend Dina might finally be going well. Very optimistic of him.',
       q: 'What does he discover she has actually been using him for?',
       img: '/questions/film.svg',
       a: 'A case for her university research' }],
    [{ q: 'Before directing some of Egypt’s biggest modern films, which Egyptian director worked as an **assistant director on El Nazer**?',
       a: 'Marwan Hamed' }],
    [{ lead: 'No actors this time.',
       q: 'Name the **writer and director** behind *El Irhab Wel Kabab*.',
       a: 'Wahid Hamed (writer) and Sherif Arafa (director)' }],
  ] },

  // ── Kora Masry pack — six variants a tier ──────────────────────────────────
  { id: 'kora', title: 'Kora Masry', sub: 'Ahly, Zamalek and the national team', ink: 1, qs: [
    // 100
    [
      { q: 'Egypt have won the Africa Cup of Nations more than any other country. How many times?',
        a: '7',
        src: 'https://www.cafonline.com/afcon2025/news/totalenergies-caf-africa-cup-of-nations-in-numbers/' },
      { q: 'Which coach led Egypt to three straight AFCON titles in 2006, 2008 and 2010?',
        a: 'Hassan Shehata',
        src: 'https://www.cafonline.com/caf-africa-cup-of-nations/news/30-days-to-totalenergies-afcon-2021-30-afcon-facts/' },
      { q: 'Egypt needed a late penalty against Congo to reach the 2018 World Cup. Who scored it?',
        a: 'Mohamed Salah',
        src: 'https://inside.fifa.com/tournaments/mens/worldcup/2018russia/news/excitement-high-for-debutants-and-returning-heroes-2921618' },
      { q: 'Which Egyptian goalkeeper became the oldest player ever to appear at a World Cup?',
        a: 'Essam El Hadary',
        src: 'https://inside.fifa.com/tournaments/mens/worldcup/2018russia/news/el-hadary-world-cup-history-2968573' },
      { q: 'Which Egyptian club holds the record for the most CAF Champions League titles?',
        a: 'Al Ahly',
        src: 'https://www.cafonline.com/caf-champions-league/news/all-you-need-to-know-about-past-winners-of-the-caf-champions-league/' },
      { q: '86th minute. Ahly vs Zamalek. 2020 Champions League final. مين صاحب القاضية؟',
        a: 'Mohamed Magdy “Afsha”',
        src: 'https://www.reddit.com/r/soccer/comments/k278zz/' },
    ],
    // 200
    [
      { q: 'Egypt beat Ghana 1–0 in the 2010 AFCON final. Who scored the goal?',
        a: 'Gedo',
        src: 'https://www.cafonline.com/afcon2025/news/one-year-to-afcon-2025-unforgettable-tournament-finales/' },
      { q: 'Who scored Egypt’s winning goal against Cameroon in the 2008 AFCON final?',
        a: 'Mohamed Aboutrika',
        src: 'https://www.cafonline.com/media/05ebfeih/ultimate-media-guide-afcon25.pdf' },
      { q: 'Amr Zaki scored 10 Premier League goals during his famous 2008/09 season. Which club was he playing for?',
        a: 'Wigan Athletic',
        src: 'https://www.premierleague.com/players/3778/Daniel-de-Ridder/overview' },
      { q: 'Before bouncing around Europe, Mido made his name at which Dutch giant?',
        a: 'Ajax',
        src: 'https://www.uefa.com/uefachampionsleague/news/01e9-0e755a32cc85-71c3be6fbe6d-1000--ajax-beckons-again-for-mido/' },
      { q: 'Omar Marmoush’s first Premier League hat-trick came in a 4–0 Manchester City win against which club?',
        a: 'Newcastle United',
        src: 'https://www.premierleague.com/en/news/4243957' },
      { q: 'Salah vs Mané became the headline of the 2021 AFCON final. Which country did Egypt face?',
        a: 'Senegal',
        src: 'https://www.cafonline.com/caf-africa-cup-of-nations/news/egypt-beat-cameroon-on-penalties-to-reach-final/' },
    ],
    // 300
    [
      { q: 'Egypt famously beat world champions Italy 1–0 in 2009. Who scored the goal?',
        a: 'Mohamed Homos',
        src: 'https://www.skysports.com/football/egypt-vs-italy/20093' },
      { q: 'Egypt drew 1–1 with the Netherlands at Italia ’90. Who scored Egypt’s penalty?',
        a: 'Magdi Abdelghani',
        src: 'https://www.fifa.com/ar/articles/egypt-historical-draw-vs-netherlands-fwc-1990-ar' },
      { q: 'Before Afsha’s القاضية in the 2020 African final, who had scored Zamalek’s equalizer?',
        a: 'Shikabala',
        src: 'https://www.reddit.com/r/soccer/comments/k278zz/' },
      { q: 'Mohamed Elneny joined Arsenal in 2016 from which Swiss club?',
        a: 'FC Basel',
        src: 'https://www.uefa.com/uefachampionsleague/news/0233-0e95c3185033-c1c84536178a-1000--basel-and-arsenal-face-tense-finale/' },
      { q: 'Egypt knocked hosts Cameroon out of AFCON 2021 on penalties. Which goalkeeper saved two penalties in the shootout?',
        a: 'Mohamed Abou Gabal / Gabaski',
        src: 'https://www.cafonline.com/caf-africa-cup-of-nations/news/egypt-beat-cameroon-on-penalties-to-reach-final/' },
      { q: 'Egypt somehow lost 4–3 to Brazil in 2009 despite which Egyptian striker scoring twice?',
        a: 'Mohamed Zidan',
        src: 'https://www.rte.ie/sport/soccer/2009/0615/250540-brazil_egypt/' },
    ],
    // 400
    [
      { q: 'Which Egyptian midfielder was named Player of the Tournament when Egypt won AFCON 2010?',
        a: 'Ahmed Hassan',
        src: 'https://www.cafonline.com/afcon2025/news/seven-titles-later-egypt-return-to-afcon-as-history-s-benchmark-and-present-contenders/' },
      { q: 'Egypt opened AFCON 2008 by beating Cameroon 4–2. Who scored a brace?',
        a: 'Mohamed Zidan',
        src: 'https://www.cafonline.com/afcon2025/news/afcon-goal-fests-revisiting-the-tournament-s-highest-scoring-classics/' },
      { q: 'Egypt reached the 2017 AFCON final and actually took the lead against Cameroon. Who scored?',
        a: 'Mohamed Elneny',
        src: 'https://www.cafonline.com/afcon2025/news/one-year-to-afcon-2025-unforgettable-tournament-finales/' },
      { q: 'Egypt beat Senegal 2–1 in the famous 2006 AFCON semifinal. Who scored the 81st-minute winner?',
        a: 'Amr Zaki',
        src: 'https://www.cafonline.com/afcon2025/news/match-stats-senegal-vs-egypt-totalenergies-caf-africa-cup-of-nations-morocco-2025-semi-final/' },
      { q: 'Zamalek won the CAF Confederation Cup in both 2019 and 2024. They beat the same Moroccan club in both finals. Who?',
        a: 'RS Berkane',
        src: 'https://www.cafonline.com/caf-confederation-cup/news/all-you-need-to-know-about-the-totalenergies-caf-confederation-cup-final/' },
      { q: 'Which two Egyptian players each collected **four AFCON winner’s medals**: 1998, 2006, 2008 and 2010?',
        a: 'Ahmed Hassan and Essam El Hadary',
        src: 'https://www.cafonline.com/media/05ebfeih/ultimate-media-guide-afcon25.pdf' },
    ],
    // 500
    [
      { q: 'One Egyptian legend won AFCON as a player and later won it again as Egypt’s coach in 1998. Who?',
        a: 'Mahmoud El Gohary',
        src: 'https://www.cafonline.com/caf-africa-cup-of-nations/news/el-gohary-and-keshi-a-feat-for-two/' },
      { q: 'The goal that sent Egypt to the 1990 World Cup came against Algeria in Cairo. Who scored it?',
        a: 'Hossam Hassan',
        src: 'https://www.cafonline.com/caf-champions-league/news/taca-da-confederacao-argelia-o-regresso-em-grande-de-hossam-hassan-29-anos-depoi/' },
      { q: 'Egypt beat South Africa 2–0 in the 1998 AFCON final. Name **both** Egyptian scorers.',
        a: 'Ahmed Hassan and Tarek Mostafa',
        src: 'https://www.cafonline.com/media/05ebfeih/ultimate-media-guide-afcon25.pdf' },
      { q: 'Who became the first Egyptian to play in the UEFA Champions League, appearing for Kaiserslautern in 1998?',
        a: 'Hany Ramzy',
        src: 'https://www.uefa.com/uefachampionsleague/news/0241-0e983c8aac87-e21aabfe2153-1000--egypt-s-greatest-european-success-stories/' },
      { q: 'Which Egyptian played in **eight consecutive AFCON tournaments**, from 1996 through 2010?',
        a: 'Ahmed Hassan',
        src: 'https://www.cafonline.com/afcon2025/news/totalenergies-caf-africa-cup-of-nations-afcon-finals-records/' },
      { q: 'Before Ahly and Zamalek dominated Africa, which Egyptian club became the country’s first African champion in 1969?',
        a: 'Ismaily',
        src: 'https://www.cafonline.com/caf-champions-league/news/shilongo-ismaily-s-biggest-consolation' },
    ],
    // 600
    [
      { q: 'The very first goal in Africa Cup of Nations history was scored by an Egyptian. Who was it?',
        a: 'Raafat Attia',
        src: 'https://www.cafonline.com/caf-africa-cup-of-nations/news/30-days-to-totalenergies-afcon-2021-30-afcon-facts/' },
      { q: 'An Egyptian still holds the record for the fastest goal in AFCON history: **23 seconds** against Gabon in 1994. Who?',
        a: 'Ayman Mansour',
        src: 'https://www.cafonline.com/afcon2025/news/from-eto-o-to-el-hadary-the-records-every-afcon-star-faces-in-morocco/' },
      { q: 'Which Egyptian is the only player in AFCON history to score **two hat-tricks**, both of them against Nigeria?',
        a: 'Hassan El-Shazly',
        src: 'https://www.cafonline.com/afcon2025/news/from-eto-o-to-el-hadary-the-records-every-afcon-star-faces-in-morocco/' },
      { q: 'Ismaily became African champions in 1969. Which club—now known as TP Mazembe—did they beat in the final?',
        a: 'TP Englebert',
        src: 'https://www.cafonline.com/caf-champions-league/news/esperance-among-five-clubs-who-conquered-africa-without-losing/' },
      { q: 'Egypt scored three against Brazil in that insane 4–3 Confederations Cup match in 2009. Zidan scored twice. Who scored the third?',
        a: 'Mohamed Shawky',
        src: 'https://www.rsssf.org/tablesi/intconcup09.html' },
      { q: 'Egypt destroyed Algeria 4–0 in the 2010 AFCON semifinal. Zidan made it 2–0 and Gedo made it 4–0. Who scored the **third**?',
        a: 'Mohamed Abdel-Shafy',
        src: 'https://www.rsssf.org/tables/2010a.html' },
    ],
  ] },

  { id: 'ma3loomat', title: 'Ma3loomat 3amma', sub: 'General knowledge, no excuses', ink: 2, qs: [
    [{ q: 'Which planet is known as the **Red Planet**?',
       a: 'Mars' }],
    [{ lead: 'And no, we’re not accepting “the heart because I love deeply.”',
       q: 'What is the **largest organ in the human body**?',
       a: 'The skin' }],
    [{ lead: 'Flying squirrels are frauds. They only glide.',
       q: 'What is the **only mammal capable of true powered flight**?',
       a: 'The bat' }],
    [{ lead: 'You’re asked for the **largest desert on Earth**. You say Sahara because obviously. You are wrong.',
       q: 'What is it?',
       a: 'Antarctica' }],
    [{ lead: 'Mercury is closest to the Sun, bas apparently Venus said: **“Ana el a7ar.”**',
       q: 'Which planet is actually the **hottest in the Solar System**?',
       a: 'Venus' }],
    [{ lead: 'Every country’s flag is basically some version of a rectangle… except one.',
       q: 'Which country has the world’s **only non-rectangular national flag**?',
       a: 'Nepal' }],
  ] },

  { id: 'akl', title: 'Akl El Beit', sub: 'Home cooking and what is on the table', ink: 3, qs: [
    [{ q: 'Which green dish has basically every Egyptian household convinced that **their** version is the correct one?',
       a: 'Molokhia' }],
    [{ lead: 'Rice. Lentils. Macaroni. Chickpeas. Tomato sauce. Crispy onions. A dish looked at every carb in the kitchen and said **“aywa, kollo.”**',
       q: 'What are we eating?',
       a: 'Koshari' }],
    [{ lead: 'That garlic-and-coriander mixture sizzling in ghee right before it hits the molokhia has a name.',
       q: 'What is it?',
       a: 'Ta2leya' }],
    [{ lead: 'Wara2 3enab, kousa, kromb, eggplant — the vegetable keeps changing, but traditional Egyptian **mahshi** keeps coming back to one main filling.',
       q: 'What is it?',
       a: 'Seasoned rice' }],
    [{ lead: 'Egyptian ta’ameya has a very important difference from the chickpea falafel common elsewhere in the region.',
       q: 'What legume is Egyptian ta’ameya traditionally based on?',
       a: 'Fava beans (fool)' }],
    [{ lead: 'Koshari is thoroughly Egyptian now, bas its ancestry is commonly linked to the Indian dish **khichdi**.',
       q: 'What two staple ingredients form the basic combination behind khichdi?',
       a: 'Rice and lentils' }],
  ] },

  { id: 'tofoola', title: 'Ayam El Tofoola', sub: 'Bakkar, Spacetoon and the Ramadan of your childhood', ink: 4, qs: [
    [{ lead: 'Bakkar had one companion who honestly deserved her own spin-off.',
       q: 'What was the name of his goat?',
       a: 'Rashida' }],
    [{ lead: 'You hear the opening of *Bakkar*. Ramadan memory unlocked immediately.',
       q: 'Which Egyptian singer performed the famous theme?',
       a: 'Mohamed Mounir' }],
    [{ q: 'Which Egyptian snack brand launched in **1997** and basically helped turn the packaged croissant into a school-bag food group?',
       a: 'Molto' }],
    [{ lead: 'Spacetoon didn’t have “genres.” It had **planets**, because apparently normal television organization was too boring.',
       q: 'Which planet was home to the sports shows?',
       a: 'Kawkab Riyada (Sport Planet)' }],
    [{ lead: 'Before TikTok challenges, Egyptian Ramadan had **Fawazeer**.',
       q: 'Name the **two female stars** most famously associated with the classic 1980s–90s Fawazeer era.',
       a: 'Nelly and Sherihan' }],
    [{ lead: 'Let’s see who’s representing the older side of the room.',
       q: '*Boogie w Tamtam* first arrived on Egyptian television during Ramadan in what year?',
       a: '1983' }],
  ] },

  { id: 'agh', title: 'Aghani Zaman', sub: 'Old songs and the voices behind them', ink: 5, qs: [
    [{ lead: 'If someone says **Kawkab El Sharq** and your teta sees you hesitating, you’ve already disappointed her.',
       q: 'Who are they talking about?',
       a: 'Umm Kulthum' }],
    [{ q: 'Who was known across Egypt and the Arab world as **El Andaleeb El Asmar**?',
       a: 'Abdel Halim Hafez' }],
    [{ q: 'Which Egyptian singer and actress gave us the patriotic classic **Ya Habibti Ya Masr**?',
       a: 'Shadia' }],
    [{ q: '*Enta Omri* marked the beginning of a historic collaboration between Umm Kulthum and which legendary Egyptian composer?',
       a: 'Mohamed Abdel Wahab' }],
    [{ lead: 'Traditionalists raised an eyebrow when *Enta Omri* introduced a distinctly modern sound into Umm Kulthum’s orchestra.',
       q: 'Which instrument opens the recording with its famous riff?',
       img: '/questions/oud.svg',
       a: 'The electric guitar' }],
    [{ lead: 'One for the team that somehow has both a Warda fan **and** an Aaliyah fan.',
       q: 'Which Warda classic was sampled in Aaliyah’s *Don’t Know What to Tell Ya* — and decades later appeared in *Moon Knight*?',
       a: 'Batwanes Beek' }],
  ] },

  // ── Placeholder categories, each still awaiting a pack ─────────────────────
  { id: 'kalam', title: 'Kalam El 3ela', sub: 'Household sayings, habits and house rules', ink: 2, qs: [
    [{ q: 'What do you say to someone who has just had a haircut or a bath?', a: 'Na’eeman' }],
    [{ q: 'Who in the family is traditionally asked to settle an argument?', a: 'The eldest' }],
    [{ q: 'What is the standard reply to “shukran”?', a: 'Al ‘afw' }],
    [{ q: 'What do guests bring when invited to dinner?', a: 'Sweets' }],
    [{ q: 'What is the word for the visit paid to a family after good news?', a: 'Mabrouk visit' }],
    [{ q: 'Who traditionally pours the tea for the room?', a: 'The youngest' }],
  ] },
  { id: 'masr', title: 'Masr Fein?', sub: 'Places, roads and where things are', ink: 5, qs: [
    [{ q: 'Which river runs through Cairo?', a: 'The Nile' }],
    [{ q: 'Which sea lies to the north of Egypt?', a: 'The Mediterranean' }],
    [{ q: 'Which canal links the Mediterranean to the Red Sea?', a: 'The Suez Canal' }],
    [{ q: 'What is the capital of Egypt?', a: 'Cairo' }],
    [{ q: 'Which city sits at the western end of the Nile Delta on the coast?', a: 'Alexandria' }],
    [{ q: 'What is the name of the large lake formed behind the Aswan High Dam?', a: 'Lake Nasser' }],
  ] },
  { id: 'mos', title: 'Mosalsalat', sub: 'Series, seasons and the Ramadan slate', ink: 1, qs: [
    [{ q: 'How many episodes does a standard Ramadan series usually run?', a: 'Thirty' }],
    [{ q: 'What is the word for one instalment of a series?', a: 'An episode' }],
    [{ q: 'What is the opening sequence of a series called?', a: 'The titles' }],
    [{ q: 'A series that continues the same story a year later is called what?', a: 'A second season' }],
    [{ q: 'What is the term for the very last episode?', a: 'The finale' }],
    [{ q: 'What is the person who writes the series called?', a: 'The screenwriter' }],
  ] },
  { id: 'sa7', title: 'Sa7 wala Ghalat', sub: 'True or false, no half marks', ink: 3, qs: [
    [{ q: 'True or false: the Nile flows south to north.', a: 'True' }],
    [{ q: 'True or false: a camel stores water in its hump.', a: 'False — it stores fat' }],
    [{ q: 'True or false: Arabic is written right to left.', a: 'True' }],
    [{ q: 'True or false: the Sahara is the largest hot desert on earth.', a: 'True' }],
    [{ q: 'True or false: sound travels faster in water than in air.', a: 'True' }],
    [{ q: 'True or false: a tomato is botanically a fruit.', a: 'True' }],
  ] },
  { id: 'sana', title: 'Ay Sana?', sub: 'Name the year, nearest guess takes it', ink: 2, qs: [
    [{ q: 'In which year did the twentieth century begin?', a: '1901' }],
    [{ q: 'In which year did the first people land on the moon?', a: '1969' }],
    [{ q: 'In which year did the Second World War end?', a: '1945' }],
    [{ q: 'In which year was the Suez Canal opened?', a: '1869' }],
    [{ q: 'In which year was the tomb of Tutankhamun found?', a: '1922' }],
    [{ q: 'In which year was the Aswan High Dam completed?', a: '1970' }],
  ] },
  { id: 'kelma', title: 'Kelma Kelma', sub: 'Words, letters and one-word answers', ink: 0, qs: [
    [{ q: 'How many letters are in the Arabic alphabet?', a: 'Twenty-eight' }],
    [{ q: 'What is a word that reads the same forwards and backwards called?', a: 'A palindrome' }],
    [{ q: 'What is the term for two words that sound alike but differ in meaning?', a: 'Homophones' }],
    [{ q: 'What do you call the three-letter core that Arabic words are built from?', a: 'The root' }],
    [{ q: 'What is the name for a word borrowed unchanged from another language?', a: 'A loanword' }],
    [{ q: 'What is the word for a saying the whole family repeats?', a: 'A proverb' }],
  ] },
  { id: 'farah', title: 'Gawaz w Farah', sub: 'Weddings, engagements and the whole procession', ink: 4, qs: [
    [{ q: 'What is the name of the procession that walks the couple in?', a: 'The zaffa' }],
    [{ q: 'What is the word for the engagement party?', a: 'Khotouba' }],
    [{ q: 'Who traditionally holds the rings before the ceremony?', a: 'The best man' }],
    [{ q: 'What is the sweet drink served at engagements?', a: 'Sharbat' }],
    [{ q: 'What is the written marriage contract called?', a: 'Katb el kitab' }],
    [{ q: 'What do guests do with the bouquet at the end of the night?', a: 'Catch it' }],
  ] },
  { id: 'share3', title: 'El Share3', sub: 'Getting around, and what it costs', ink: 5, qs: [
    [{ q: 'What is the shared minibus most people take called?', a: 'A microbus' }],
    [{ q: 'How many lines does the Cairo metro run?', a: 'Three' }],
    [{ q: 'What do you call the person who collects the fare on a bus?', a: 'The conductor' }],
    [{ q: 'What is the three-wheeled vehicle used in narrow streets?', a: 'A tuk-tuk' }],
    [{ q: 'What is the word for the roadside kiosk selling everything?', a: 'A kushk' }],
    [{ q: 'What colour are Cairo taxis?', a: 'White' }],
  ] },
  { id: 'beit', title: 'Fi El Beit', sub: 'Objects, rooms and how the house works', ink: 2, qs: [
    [{ q: 'What is the covered balcony room called?', a: 'A veranda' }],
    [{ q: 'What do you call the tall glass used for tea?', a: 'A kobbaya' }],
    [{ q: 'What is the small copper pot for making coffee called?', a: 'A kanaka' }],
    [{ q: 'What is the name for the roof-level water tank?', a: 'A khazan' }],
    [{ q: 'What do you call the fold-down guest bed?', a: 'A sofa bed' }],
    [{ q: 'What is the room kept tidy only for guests called?', a: 'The salon' }],
  ] },
  { id: 'raqam', title: 'Raqam Kam?', sub: 'Numbers, prices and how many', ink: 3, qs: [
    [{ q: 'How many governorates does Egypt have?', a: 'Twenty-seven' }],
    [{ q: 'How many days are in a lunar year?', a: '354' }],
    [{ q: 'How many players are in a volleyball team on court?', a: 'Six' }],
    [{ q: 'How many pyramids stand on the Giza plateau?', a: 'Three' }],
    [{ q: 'How many strings does an oud usually have?', a: 'Eleven' }],
    [{ q: 'How many hours ahead of GMT is Cairo in winter?', a: 'Two' }],
  ] },
];

export const byId = (id: string): Category => {
  const cat = POOL.find((p) => p.id === id);
  if (!cat) throw new Error(`Unknown category id: ${id}`);
  return cat;
};

/**
 * The question a board is showing for one tile. `variants` carries the draw made
 * when the board opened; a tile with no recorded draw — an older save, or a tier
 * that only ever had one question — falls back to the first variant.
 */
export const questionAt = (cat: string, row: number, variants: Record<string, number>): Question => {
  const tier = byId(cat).qs[row - 1];
  return tier[variants[`${cat}-${row}`] ?? 0] ?? tier[0];
};

/** Draws one variant per tier for each drafted category. */
export const drawVariants = (drafted: string[]): Record<string, number> => {
  const picks: Record<string, number> = {};
  for (const id of drafted) {
    byId(id).qs.forEach((tier, i) => {
      picks[`${id}-${i + 1}`] = Math.floor(Math.random() * tier.length);
    });
  }
  return picks;
};
