// Content source: kabbalistic-astrology.html (verbatim).
// Used by src/routes/kabbalistic-astrology.tsx.

export type Era =
  | "Foundations"
  | "Antiquity"
  | "Medieval"
  | "Early Modern"
  | "18th Century"
  | "18th–19th Century"
  | "20th Century"
  | "Modern Paths";

export interface TimelineEntry {
  id: string;
  era: Era;
  title: string;
  date: string;
  source: string;
  body: string;
  note?: string;
  quote?: string;
  quoteCite?: string;
  teaching?: string;
}

export const TIMELINE: TimelineEntry[] = [
  {
    id: "abraham",
    era: "Foundations",
    title: "Abraham and the Sefer Yetzirah Tradition",
    date: "Traditional attribution: c. 18th century BCE",
    source: "Sefer Yetzirah (Book of Formation)",
    body:
      "Rabbinic and Kabbalistic tradition credits the core of this cosmic-linguistic science to the patriarch Abraham, and the closing chapter of the book describes his own insight into creation. Its central claim is that the universe was built through the twenty-two letters of the Hebrew alphabet, sorted into three groups: the Three Mothers (Aleph, Mem, Shin), the Seven Doubles, and the Twelve Simples, also called the Twelve Elementals. Each letter is treated as a living channel of creative force rather than a mere sign. That is why the same tradition reads the word mazal not only as a constellation, but, in a play on the Hebrew root nozel meaning to flow, as a conduit through which divine abundance drips down into the world.",
    note:
      "Historical and critical scholars place the surviving text in late antiquity, somewhere between the 2nd and 6th centuries CE, while traditional sources attribute its wisdom to Abraham himself.",
    quote:
      "“He made the letter Heh king over speech, and bound a crown to it, and combined them one with another, and with them He formed Aries in the universe, Nissan in the year, and the right foot in the soul, male and female.”",
    quoteCite: "Sefer Yetzirah 5:7 (Gra-Ari recension)",
  },
  {
    id: "recensions",
    era: "Foundations",
    title: "The Recensions of Sefer Yetzirah",
    date: "c. 2nd–6th centuries CE; later edited 10th–18th c.",
    source: "Short, Long, Saadia and Gra recensions",
    body:
      "Sefer Yetzirah did not reach us as one fixed book. It survives in several manuscript families. The Short Recension is the oldest and most compressed, written in a terse and enigmatic style. The Long Recension adds explanatory passages that spell out the system. The Saadia Recension was arranged by Saadia Gaon in the 10th century and read alongside early rationalist astronomy. The Gra Recension was edited by the Vilna Gaon in the 18th century into a tightly unified structure that corrected copyist errors. These versions do not always agree on which letter governs which planet, month, or organ, so any careful study of Kabbalistic astrology has to keep the recension in view rather than treat one table as final.",
    note:
      "The correspondences that circulate most widely in modern Kabbalah generally follow the Gra, or Gra-Ari, recension.",
  },
  {
    id: "josephus",
    era: "Antiquity",
    title: "Flavius Josephus and Temple Cosmology",
    date: "c. 37–100 CE",
    source: "Antiquities of the Jews 3.7.7 (3.181–187)",
    body:
      "In the Second Temple era the historian Flavius Josephus read the furnishings of the Tabernacle and Temple as a deliberate map of the heavens. The seven branches of the menorah, the twelve loaves of showbread, and other vessels were, in his telling, built to mirror the structure of the cosmos. It is one of the earliest places we see Jews reading the order of the stars into their own worship.",
    quote:
      "“The seven lamps upon the candlestick referred to the course of the planets, of which that is the number; and the twelve loaves that were upon the table signified the circle of the zodiac and the year.”",
    quoteCite: "Josephus, Antiquities 3.7.7 (Whiston translation, lightly modernized)",
  },
  {
    id: "talmud",
    era: "Antiquity",
    title: "The Talmud and Ein Mazal LeYisrael",
    date: "Babylonian Talmud, redacted c. 500 CE",
    source: "Talmud Bavli, Shabbat 156a",
    body:
      "The clearest rabbinic discussion of the stars sits on a single page of the Talmud. There the sages weigh whether a person's fortune is governed by the constellation under which they were born. Rabbi Chanina holds that there is mazal, a real astral influence, even for Israel. Rabbi Yochanan answers that Israel is not bound by a constellation, since prayer, merit, and a change of conduct can change what the stars seem to promise. The same passage tells of people whose good deeds overturned an astrologer's prediction. This debate became the seedbed for nearly every later Jewish view of astrology.",
    note:
      "The phrase Ein Mazal LeYisrael, that Israel is not bound by a constellation, is quoted by the medieval commentators, who then read it in strikingly different ways.",
    quote:
      "“Rabbi Yochanan said: Israel is not bound by a constellation, for through prayer and merit a person can change what is decreed.”",
    quoteCite: "After Talmud Bavli, Shabbat 156a (paraphrased)",
  },
  {
    id: "donnolo",
    era: "Medieval",
    title: "Shabbetai Donnolo and Sefer Hakhmoni",
    date: "c. 913–c. 982 CE",
    source: "Sefer Hakhmoni (commentary on Sefer Yetzirah)",
    body:
      "Shabbetai Donnolo was a physician in Byzantine southern Italy and one of the first writers to read Sefer Yetzirah through the lens of astronomy and medicine. His Sefer Hakhmoni works out in detail how the human body, the small world or microcosm, mirrors the larger body of the heavens, the macrocosm, and it includes one of the earliest astronomical tables written in Hebrew. With Donnolo the letter mysticism of Sefer Yetzirah is joined to a working knowledge of the planets and the healing arts.",
    teaching:
      "Whatever stands in the great world of the heavens has its counterpart in the small world of the human body.",
  },
  {
    id: "halevi",
    era: "Medieval",
    title: "Judah Halevi and the Kuzari",
    date: "c. 1075–1141 CE",
    source: "The Kuzari",
    body:
      "The poet and philosopher Judah Halevi gave Sefer Yetzirah a place of honor in his Kuzari, where he presents it as a record of Abraham's insight into the unity behind creation. At the same time he is cautious about astral determinism. For Halevi the deepest cause of events is direct divine providence and the bond between God and Israel, not the mechanical pull of the stars. He treats the order of the heavens as real, yet firmly subordinate to a higher will.",
    teaching:
      "The order of the stars is real, yet it serves a higher providence rather than ruling in its own right.",
  },
  {
    id: "ibnezra",
    era: "Medieval",
    title: "Abraham ibn Ezra",
    date: "c. 1089–1167 CE",
    source: "Reshit Chochmah, Sefer ha-Te'amim, Sefer ha-Moladot and others",
    body:
      "Abraham ibn Ezra was the most important Jewish astrologer of the Middle Ages. A grammarian, poet, biblical commentator, and lifelong traveler, he wrote a whole library of astrological treatises in Hebrew, among them Reshit Chochmah (The Beginning of Wisdom), Sefer ha-Te'amim (The Book of Reasons), Sefer ha-Moladot (The Book of Nativities), and Sefer ha-Olam (The Book of the World). These works carried Greek and Arabic astrology into the Hebrew language and shaped how later Jewish thinkers talked about the planets and signs. His Torah commentary also brings in astrological readings, even while he holds that the God of Israel is above the natural order.",
    note:
      "Ibn Ezra is the main channel through which classical and Arabic astrology entered later Jewish and Kabbalistic writing.",
    teaching:
      "The signs and planets carry real influence, and the wise person studies them, yet the One who set them in place can raise a soul above them.",
  },
  {
    id: "rambam",
    era: "Medieval",
    title: "Maimonides and the Rationalist Dissent",
    date: "1138–1204 CE",
    source: "Letter on Astrology (to the sages of southern France)",
    body:
      "Not every Jewish thinker welcomed the stars. Maimonides, the great philosopher and legal authority, was the tradition's sharpest critic of astrology. When the sages of Montpellier and Lunel wrote to ask his opinion, he answered in his Letter on Astrology that judging human affairs by the constellations is not a science but a mistake, and that a thinking person should rely on reason, effort, and trust in God rather than on horoscopes. His view stayed the main counterweight to the astrological side of Jewish thought, and any fair history has to keep the two together.",
    note: "Maimonides read Ein Mazal LeYisrael as a rejection of astral determinism for everyone, not only for Israel.",
    quote:
      "“These matters are no science at all, but folly, and a person of understanding should not be drawn after them.”",
    quoteCite: "After Maimonides, Letter on Astrology, c. 1194 (paraphrased)",
  },
  {
    id: "zohar",
    era: "Medieval",
    title: "Rabbi Shimon bar Yochai and the Zohar",
    date: "Traditional: 2nd c. CE · Composed/compiled: 13th c. CE",
    source: "Zohar, especially Parashat Terumah (II:171b)",
    body:
      "The Zohar, the central work of classical Kabbalah, reads the heavens in a thoroughly spiritual way. The stars and constellations have no power of their own. They work more like officials in a vast chain of command, carrying out decrees that begin higher up. The Zohar also ties the large world of the heavens to the small world of the human body, so that every limb and faculty answers to something above it.",
    note:
      "Tradition attributes the Zohar to Rabbi Shimon bar Yochai. Academic scholarship places its composition in 13th-century Spain and associates it with Rabbi Moses de León.",
    teaching:
      "Every limb of the body has a counterpart above. All lower things are tied to their spiritual roots, and the constellations act as administrators over the structures below.",
  },
  {
    id: "ramban",
    era: "Medieval",
    title: "Ramban (Nachmanides)",
    date: "1194–1270 CE",
    source: "Commentary on the Torah (Deuteronomy 18:13)",
    body:
      "Ramban, at once a leading Talmudist, a physician, and a Kabbalist, helped set the normative Jewish attitude toward astrology. He accepted that celestial patterns are a real part of the natural order, yet he taught that closeness to God can lift a person above that order. The stars incline, but devotion can change what they incline toward.",
    note:
      "The principle Ein Mazal LeYisrael, that Israel is not bound by a constellation, comes from the Talmud (Shabbat 156a), where it appears as one side of a recorded debate between Rabbi Chanina and Rabbi Yochanan. Later commentators, Ramban among them, develop the idea.",
    teaching:
      "Events tend to follow the natural order of the stars, yet a person who draws close to divine service can rise above that order.",
  },
  {
    id: "cordovero",
    era: "Early Modern",
    title: "Rabbi Moshe Cordovero, the Ramak",
    date: "1522–1570 CE",
    source: "Pardes Rimonim (Orchard of Pomegranates)",
    body:
      "Rabbi Moshe Cordovero, known as the Ramak, was the great organizer of Kabbalah in Safed in the years just before Isaac Luria. His Pardes Rimonim gathered the scattered teachings of earlier Kabbalah into one ordered system and mapped how the divine light descends through the Sefirot and into the worlds, the planets among them. He gave later writers a clear framework for treating cosmic influence as a single chain of emanation rather than a set of independent powers.",
    teaching:
      "The forces seen in the heavens are stations along one chain of emanation that begins in the Sefirot.",
  },
  {
    id: "arizal",
    era: "Early Modern",
    title: "Rabbi Isaac Luria, the Arizal",
    date: "1534–1572 CE",
    source: "Sha'ar HaGilgulim (Gate of Reincarnations)",
    body:
      "Rabbi Isaac Luria, known as the Arizal, rebuilt Kabbalah around a dramatic cosmic story. A primordial breaking of the vessels (Shevirat HaKelim) scattered sparks of divine light, and the long work of repair (Tikkun) gathers them back. Inside this picture a birth chart is not a sentence handed down by fate. It is closer to a diagnostic map, showing which parts of a reincarnating soul (Gilgul) were damaged in earlier lives and what this lifetime is meant to mend.",
    teaching:
      "Each soul enters the world under the particular constellation that serves as the exact gateway for its own repair.",
  },
  {
    id: "ramchal",
    era: "18th Century",
    title: "Ramchal, Rabbi Moshe Chaim Luzzatto",
    date: "1707–1746 CE",
    source: "Derech Hashem (The Way of God); Da'at Tevunot",
    body:
      "Rabbi Moshe Chaim Luzzatto, known by the acronym Ramchal, set out the Lurianic worldview in clear and orderly prose. In works such as Derech Hashem he describes how God governs the world through a layered system of intermediaries, the stars and constellations among them, while leaving room at every level for human freedom and direct providence. His writing helped later students see astrological forces as one part of an ordered system of divine governance rather than as blind fate.",
    teaching:
      "The heavens are one rung in an ordered system of governance, set beneath a providence that still leaves room for human choice.",
  },
  {
    id: "gra",
    era: "18th Century",
    title: "The Vilna Gaon and the Analytic Approach",
    date: "1720–1797 CE",
    source: "Biur HaGra on Sefer Yetzirah",
    body:
      "Rabbi Elijah of Vilna, known as the Gra, prized rigor and exact knowledge. He treated the structure of creation as a real and largely mathematical science, and he held that a person cannot fully master Torah while ignoring the natural sciences. Astronomy and mathematics, in this view, describe how the higher Sefirot show themselves in the physical world.",
    teaching:
      "As his student Rabbi Baruch of Shklov recorded it, whatever a person lacks in the secular sciences he will lack many times over in the wisdom of Torah, for the two are joined together.",
  },
  {
    id: "hasidic",
    era: "18th–19th Century",
    title: "The Hasidic Turn Inward",
    date: "Baal Shem Tov 1698–1760 · Bnei Yissaschar 1783–1841",
    source: "Bnei Yissaschar (R. Tzvi Elimelech of Dynów)",
    body:
      "Hasidism, founded by Rabbi Israel Baal Shem Tov and continued by teachers such as Rabbi Tzvi Elimelech of Dynów, author of the Bnei Yissaschar, turned Kabbalah inward. The planets and signs are read less as objects in the sky and more as inner forces, the moods and states of mind that live inside a person. A moment like the New Moon (Rosh Chodesh) becomes an opening to draw on the particular energy of that month.",
    teaching:
      "The twelve signs are twelve pathways of the mind. When the month of Nissan arrives, the force of Aries, which is renewal and the power of speech, stirs inside the human heart and not only among the stars.",
  },
  {
    id: "ashlag",
    era: "20th Century",
    title: "Rav Yehuda Ashlag, Baal HaSulam",
    date: "1885–1954 CE",
    source: "Talmud Eser Sefirot; the Sulam commentary on the Zohar",
    body:
      "Rav Yehuda Ashlag, called Baal HaSulam, gave the Zohar a full Hebrew commentary known as the Sulam, or Ladder, and recast Lurianic Kabbalah in psychological and social terms. He read the cosmic forces as outward images of two inner drives, the Desire to Receive, which he linked to ego, and the Desire to Bestow, which he linked to giving and love. Spiritual work, in his system, is the slow turning of the first into the second until a person reaches what he called equivalence of form with the Creator.",
    teaching:
      "As long as a person is ruled by the desire to receive, they remain inside the natural system. Turning that desire toward giving lifts them beyond it.",
  },
  {
    id: "kaplan",
    era: "20th Century",
    title: "Rabbi Aryeh Kaplan",
    date: "1934–1983 CE",
    source: "Sefer Yetzirah: The Book of Creation in Theory and Practice",
    body:
      "Rabbi Aryeh Kaplan, who trained as a physicist before becoming a teacher and translator, opened meditative and cosmological Kabbalah to a wide English-speaking readership. He argued that the correspondences in Sefer Yetzirah are not folklore but a careful, layered system meant to guide meditation and the trained direction of attention.",
    teaching:
      "The mappings in Sefer Yetzirah read as instructions for meditation. By picturing the letters tied to a given planet or sign, a practitioner can steady and shift their state of awareness.",
  },
  {
    id: "rashash",
    era: "Modern Paths",
    title: "The Sephardic Rashash School",
    date: "Living tradition · Rashash 1720–1777",
    source: "Siddur HaRashash; the writings of Rabbi Shalom Sharabi",
    body:
      "This path carries the Lurianic Kabbalah of the Arizal as it was organized in the 18th century by the Yemenite master Rabbi Shalom Sharabi, known as the Rashash. Its heart is theurgical prayer, long and exact meditations called kavanot that use the Siddur HaRashash to route divine light through the worlds of the Sefirot. It remains a living and highly traditional discipline among Sephardic and Mizrahi kabbalists.",
    teaching:
      "Astrological forces are taken as real and objective laws of the spiritual world, navigated through precise divine names rather than read as metaphors. As a ship must read real ocean currents, the soul reads the real currents of the mazalot.",
  },
  {
    id: "ashlagian",
    era: "Modern Paths",
    title: "Traditional Ashlagian Schools",
    date: "Living tradition · after Baal HaSulam and the Rabash",
    source: "Talmud Eser Sefirot; the writings of the Rabash",
    body:
      "Students of Baal HaSulam and his son and successor Rav Baruch Shalom Ashlag, the Rabash, center their work on close study of Talmud Eser Sefirot, the structured physics of the spiritual worlds, together with group study aimed at moving the heart from self interest toward giving. Some communities have built large lay study structures while keeping a conservative curriculum.",
    teaching:
      "The stars stand for the architecture of the ego, the Desire to Receive. Real growth means reaching equivalence of form with the Creator, which naturally raises a person above the pull of the zodiac.",
  },
  {
    id: "centre",
    era: "Modern Paths",
    title: "The Kabbalah Centre and Universalist Kabbalah",
    date: "Founded 1965 · Los Angeles centre 1984",
    source: "Philip Berg, Kabbalistic Astrology, and other works",
    body:
      "The best known of these today is the Kabbalah Centre. It began in 1965, when Rav Yehuda Tzvi Brandwein, a student in the circle of Rav Yehuda Ashlag, and his own student Philip Berg founded an institute to publish and teach Ashlagian Kabbalah. Under Philip Berg and Karen Berg it grew into an international network of centers and online study, with a major branch opening in Los Angeles in 1984, and it is now led by Karen Berg and Michael Berg. The Centre teaches Kabbalah as a practical wisdom open to anyone, the idea being that turning from selfish reaction toward sharing brings a person into harmony with what it calls the Light. Its signature practices include reading or scanning the Aramaic letters of the Zohar, wearing a red string, meditating on the 72 Names of God, using Kabbalah water, and gathering at each New Moon. Astrology is central to its message: Philip Berg's Kabbalistic Astrology roots the birth chart and the Hebrew months in Sefer Yetzirah and reads them as a map of a person's tendencies and their work of Tikkun, not as fixed fate.",
    note:
      "The Kabbalah Centre is the most widely known popular presentation of Kabbalah. It has drawn a large international following, along with ongoing discussion about how its universal and accessible style relates to older, more traditional forms of study.",
  },
  {
    id: "renewal",
    era: "Modern Paths",
    title: "Neo-Hasidism and Jewish Renewal",
    date: "Living tradition · mid-20th century to today",
    source: "Writings of Zalman Schachter-Shalomi and Arthur Green",
    body:
      "Rooted in the Baal Shem Tov and carried into the present by teachers such as Rabbi Zalman Schachter-Shalomi and Rabbi Arthur Green, this broad current joins Hasidic inwardness with meditation, chant, embodied practice, and care for the natural world, including an ethic some call eco-kashrut. It tends to be experiential, egalitarian, and open to conversation with other contemplative traditions.",
    teaching:
      "Cosmic cycles are living, sacred rhythms to move with for healing and inner integration, often understood through the Divine Presence, the Shekhinah.",
  },
  {
    id: "academic",
    era: "Modern Paths",
    title: "Academic and Historical-Critical Study",
    date: "Living tradition · 20th century to today",
    source: "Gershom Scholem, Moshe Idel, Elliot Wolfson",
    body:
      "Opened by Gershom Scholem and continued by scholars such as Moshe Idel and Elliot Wolfson, this approach studies Kabbalah through manuscripts, language, and history rather than as received revelation. It has changed how scholars, and a good number of practitioners, understand where these ideas actually came from.",
    teaching:
      "Kabbalistic cosmology is read as a living human tradition that took in Babylonian, Hellenistic, Islamic, and Renaissance ideas and reshaped them within a Jewish, monotheistic, letter based framework.",
  },
];

export const ERAS: ReadonlyArray<"All" | Era> = [
  "All",
  "Foundations",
  "Antiquity",
  "Medieval",
  "Early Modern",
  "18th Century",
  "18th–19th Century",
  "20th Century",
  "Modern Paths",
];

export const SEVEN_DOUBLES: ReadonlyArray<readonly [string, string, string]> = [
  ["Bet ב", "Moon · Levanah", "Right eye"],
  ["Gimel ג", "Mars · Ma'adim", "Right ear"],
  ["Dalet ד", "Sun · Chamah", "Right nostril"],
  ["Kaf כ", "Venus · Nogah", "Left eye"],
  ["Peh פ", "Mercury · Kochav", "Left ear"],
  ["Resh ר", "Saturn · Shabtai", "Left nostril"],
  ["Tav ת", "Jupiter · Tzedek", "Mouth"],
];

export const TWELVE_ELEMENTALS: ReadonlyArray<
  readonly [string, string, string, string, string]
> = [
  ["Heh ה", "Aries", "Nissan", "Speech", "Right foot"],
  ["Vav ו", "Taurus", "Iyar", "Thought", "Right kidney"],
  ["Zayin ז", "Gemini", "Sivan", "Motion", "Left foot"],
  ["Chet ח", "Cancer", "Tammuz", "Sight", "Right hand"],
  ["Tet ט", "Leo", "Av", "Hearing", "Left kidney"],
  ["Yod י", "Virgo", "Elul", "Action", "Left hand"],
  ["Lamed ל", "Libra", "Tishrei", "Coition", "Gall bladder"],
  ["Nun נ", "Scorpio", "Cheshvan", "Smell", "Intestines"],
  ["Samekh ס", "Sagittarius", "Kislev", "Sleep", "Stomach (kivah)"],
  ["Ayin ע", "Capricorn", "Tevet", "Anger", "Liver"],
  ["Tzadi צ", "Aquarius", "Shevat", "Taste", "Gizzard (korkeban)"],
  ["Qof ק", "Pisces", "Adar", "Laughter", "Spleen"],
];

export const MATRIX: ReadonlyArray<readonly [string, string, string, string]> = [
  [
    "Sefer Yetzirah",
    "Sefer Yetzirah (Gra)",
    "A linguistic architecture in which letters form the planets and signs.",
    "Meditative visualization and permutation of the letters.",
  ],
  [
    "The Zohar",
    "Zohar (classical)",
    "A descent of Sefirotic light down through the planetary spheres.",
    "Connecting to the transcendent spiritual roots of the cosmos.",
  ],
  [
    "Vilna Gaon",
    "Biur HaGra",
    "Precise, mathematical laws of nature set in place by the Divine.",
    "Rigorous Torah study joined with scientific knowledge.",
  ],
  [
    "Hasidism",
    "Bnei Yissaschar",
    "Inner states and archetypes living within the soul.",
    "Devotional inwardness (devekut) and refinement of character.",
  ],
  [
    "Ashlagian",
    "Talmud Eser Sefirot",
    "The constraints of the ego, the Desire to Receive.",
    "Turning self interest toward the Divine Desire to Bestow.",
  ],
  [
    "Academic",
    "Scholem, Idel",
    "A cultural reworking of surrounding astronomical sciences.",
    "Contextual reading and historical analysis.",
  ],
];

export type GlossaryCat = "Core" | "Cosmology" | "Texts" | "Practice";

export interface GlossaryTerm {
  term: string;
  cat: GlossaryCat;
  def: string;
  link?: string;
  linkText?: string;
}

export const GLOSSARY: GlossaryTerm[] = [
  {
    term: "Chokhmat HaMazalot",
    cat: "Core",
    def: "Literally the wisdom of the constellations. It is the Kabbalistic study of cosmic influence as a projection of a higher spiritual reality, distinct from pagan or purely predictive astrology.",
  },
  {
    term: "Mazal (pl. Mazalot)",
    cat: "Core",
    def: "A constellation, a zodiac sign, or a person's destiny. The word traces linguistically to the Akkadian mazzaltu, the station or position of a star. Mystics also read it through the Hebrew root nozel, to flow, picturing a mazal as a channel through which divine abundance pours down.",
  },
  {
    term: "Shefa",
    cat: "Core",
    def: "Divine abundance or influx, the spiritual flow that descends through the Sefirot and the celestial gateways into the world.",
  },
  {
    term: "Sefirot",
    cat: "Cosmology",
    def: "The ten primary emanations or channels through which the Infinite (Ein Sof) acts within creation. They form the structural map beneath Kabbalistic cosmology.",
  },
  {
    term: "Sefer Yetzirah",
    cat: "Texts",
    def: "The Book of Formation, the foundational text of Kabbalistic cosmology. It describes creation through the twenty-two Hebrew letters, grouped as Three Mothers, Seven Doubles, and Twelve Elementals, and survives in several recensions.",
  },
  {
    term: "Three Mothers",
    cat: "Cosmology",
    def: "The letters Aleph, Mem, and Shin, set against the elements air, water, and fire. They form the primary triad of Sefer Yetzirah.",
  },
  {
    term: "Seven Doubles",
    cat: "Cosmology",
    def: "The letters Bet, Gimel, Dalet, Kaf, Peh, Resh, and Tav, linked to the seven classical planets, the seven days, and the seven openings of the head, namely the two eyes, two ears, two nostrils, and the mouth.",
  },
  {
    term: "Twelve Elementals",
    cat: "Cosmology",
    def: "The twelve simple letters, linked to the twelve zodiac signs, the twelve Hebrew months, and twelve faculties and organs of the body.",
  },
  {
    term: "Zohar",
    cat: "Texts",
    def: "The central work of classical Kabbalah. It presents the stars as administrators within a chain of spiritual cause rather than as independent powers.",
  },
  {
    term: "Shevirat HaKelim",
    cat: "Cosmology",
    def: "The breaking of the vessels, the Lurianic account of a primordial rupture that scattered sparks of divine light and set the stage for cosmic repair.",
  },
  {
    term: "Tikkun",
    cat: "Core",
    def: "Rectification or repair, the mending of what was broken in creation and in the soul. In Lurianic astrology it is the specific correction a soul comes into the world to make. Each of the twelve months and signs carries its own work of Tikkun.",
    link: "/tikkun",
    linkText: "Explore the 12 Tikkunim",
  },
  {
    term: "Gilgul",
    cat: "Core",
    def: "The cycling or reincarnation of the soul. A birth chart is read as a map of what a soul still needs to repair in this lifetime.",
  },
  {
    term: "Tzimtzum",
    cat: "Practice",
    def: "Contraction, the self limiting of divine light to make room for creation. By analogy it names the inner discipline of restraining self interest.",
  },
  {
    term: "Devekut",
    cat: "Practice",
    def: "Cleaving, or attachment to God, a contemplative ideal that stands at the center of Hasidic practice.",
  },
  {
    term: "Ein Mazal LeYisrael",
    cat: "Core",
    def: "Israel is not bound by a constellation, a Talmudic principle (Shabbat 156a) holding that devotion can rise above astrological determinism. It is recorded as one side of a debate.",
  },
  {
    term: "Shekhinah",
    cat: "Core",
    def: "The indwelling Divine Presence, tied to immanence and, in many modern readings, to the sacred presence within the natural world.",
  },
  {
    term: "Ratzon LeKabel",
    cat: "Core",
    def: "The Desire to Receive. In Ashlagian Kabbalah it is the root of ego and the force that astrology is said to chart. Turning it into the Desire to Bestow is the goal of spiritual work.",
  },
  {
    term: "Rosh Chodesh",
    cat: "Practice",
    def: "The New Moon that begins each Hebrew month, understood in many traditions as a moment of openness to that month's particular spiritual energy.",
  },
  {
    term: "Kavanot",
    cat: "Practice",
    def: "Structured meditative intentions, especially the intricate permutations of divine names used in Rashash school prayer.",
  },
  {
    term: "Nefesh HaBehemit",
    cat: "Core",
    def: "The animal soul, the reactive and instinctual side of a person, often tied to the raw tendencies a chart describes and that spiritual work refines.",
  },
  {
    term: "Teli",
    cat: "Cosmology",
    def: "An axis or celestial pole named in Sefer Yetzirah, alongside the Cycle and the Heart, as one of the great organizing principles of universe, year, and soul.",
  },
  {
    term: "Recension",
    cat: "Texts",
    def: "A distinct manuscript version of a text. The Short, Long, Saadia, and Gra recensions of Sefer Yetzirah differ in how they match letters to planets and organs.",
  },
  {
    term: "Microcosm and Macrocosm",
    cat: "Cosmology",
    def: "The idea that the human being is a small world that mirrors the large world of the cosmos. Writers from Shabbetai Donnolo to the Zohar use it to link the organs and faculties of the body to the planets and signs above.",
  },
  {
    term: "Pardes Rimonim",
    cat: "Texts",
    def: "The Orchard of Pomegranates, Rabbi Moshe Cordovero's systematic summary of Kabbalah, which organized earlier teaching on the Sefirot and the descent of divine light into one framework just before the time of Isaac Luria.",
  },
  {
    term: "Scanning the Zohar",
    cat: "Practice",
    def: "A practice of passing the eyes over the Aramaic letters of the Zohar as a way of connecting to its energy, even without translating every word.",
  },
  {
    term: "Red String",
    cat: "Practice",
    def: "A length of red wool worn on the wrist, understood as a guard against the evil eye (ayin hara) and a reminder of the intention to give.",
  },
  {
    term: "72 Names of God",
    cat: "Practice",
    def: "A set of seventy-two three-letter combinations drawn from verses in the Book of Exodus, used in some Kabbalistic practice as focal points for meditation.",
  },
];

export const GCATS: ReadonlyArray<"All" | GlossaryCat> = [
  "All",
  "Core",
  "Cosmology",
  "Texts",
  "Practice",
];

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ: FaqItem[] = [
  {
    q: "What is Kabbalistic astrology?",
    a: "Kabbalistic astrology, in Hebrew Chokhmat HaMazalot, studies cosmic influence as a flow of divine energy through spiritual gateways that are mapped to the Hebrew alphabet, rather than as physical radiation or fixed pagan fate. The stars are read as a projection of a higher spiritual reality.",
  },
  {
    q: "How is it different from Western astrology?",
    a: "It shares the twelve zodiac signs, but it frames them through the Hebrew letters, the Hebrew months, and the Sefirot, and it treats the stars as something a person can rise above through spiritual work rather than as an unbreakable destiny.",
  },
  {
    q: "What does the word mazal actually mean?",
    a: "Its linguistic root is the Akkadian mazzaltu, the station or position of a star. Jewish mystics add a second reading through the Hebrew root nozel, to flow, picturing a mazal as a channel for divine abundance.",
  },
  {
    q: "Does Kabbalah teach that the stars control our fate?",
    a: "Classical Jewish thought is careful here. A well known Talmudic principle, Ein Mazal LeYisrael, holds that devotion can carry a person past astrological determinism. Maimonides went further and rejected astrology outright as unscientific, while many Kabbalists kept it but treated a chart as a map of tendencies to work with rather than a verdict.",
  },
  {
    q: "Why do the correspondence tables sometimes differ?",
    a: "Sefer Yetzirah survives in several recensions, the Short, Long, Saadia, and Gra, and they assign letters to planets and organs in slightly different ways. The tables here follow the Gra-Ari recension and note that other versions vary.",
  },
  {
    q: "What is the Kabbalah Centre?",
    a: "The Kabbalah Centre is an international organization founded in 1965 that grew out of the Ashlagian tradition through Rav Yehuda Tzvi Brandwein and Philip and Karen Berg. It teaches Kabbalah as a practical wisdom open to everyone and is well known for popularizing Kabbalistic astrology, scanning the Zohar, the red string, and the 72 Names of God. You can find it as an entry in the Interactive Timeline above, filed under the Modern Paths era.",
  },
];
