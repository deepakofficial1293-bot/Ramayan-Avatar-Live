// Prompts for the Ramayan Avatar Booth.
// They live on the server so nobody can use your fal.ai key to generate anything else.
//
// Three rules behind the wording:
// 1. Face first. The identity instruction comes before anything else, and the
//    character is a COSTUME the person wears ("dressed as"), never a face to draw.
// 2. Authentic Indian iconography is spelled out item by item (kirita crown,
//    bare chest with sacred thread, dhoti, uttariya, keyura armlets, kundala
//    earrings), because words like "crown", "robe" or "armour" alone produce
//    European / Persian looks.
// 3. A shared "avoid" line rules out Persian, Mughal, Arab and European elements.

const FACE =
  "Keep the exact face of the person in this photo: the same eyes, eyebrows, nose, lips, " +
  "jawline, face shape, skin tone, age, facial hair, glasses, moles and natural expression, " +
  "at the same angle. Do not beautify, slim, age or replace the face; friends must recognise " +
  "this person instantly. Keep the person's own body build unless told otherwise. " +
  "Change only the clothing, jewellery, hair, pose and background.";

// Shared vocabulary for male royal characters.
const ROYAL_MALE =
  "bare chest and arms with a thin sacred thread (yajnopavita) across the chest, " +
  "large gold makara kundala earrings, layered gold necklaces (haar), gold keyura armlets " +
  "on the upper arms, gold kada bangles, a jewelled gold waist belt (kamarbandh)";

const KIRITA =
  "a tall conical gold kirita mukuta crown shaped like a South Indian temple spire, " +
  "with jewelled tiers and a pointed top";

const AUTHENTIC =
  "Authentic ancient Indian look, as in Raja Ravi Varma paintings and Indian temple art. " +
  "Avoid anything Persian, Mughal, Arab, Greek, Roman or medieval European: no domed, " +
  "velvet or cross-topped crowns, no turbans, no shirts, tunics, kurtas, robes or capes " +
  "covering the chest, no Western plate armour, no castles.";

const FRAME =
  "Vertical waist-up portrait with the face large, sharp and well lit. " +
  "No text, captions, borders or watermarks.";

const STYLES = {
  painting:
    "Render it as an oil painting in the style of Raja Ravi Varma: lifelike Indian faces, " +
    "rich jewel colours, glowing gold, soft warm light, classical Indian composition.",
  cinematic:
    "Render it as a photorealistic still from a big-budget Indian mythological film: " +
    "real silk, real gold jewellery, warm cinematic light, Indian palace and temple sets, " +
    "shallow depth of field.",
};

const CHARACTERS = {
  rama: {
    aspect: "3:4",
    costume:
      `Dress this person as Shri Rama, prince of Ayodhya, from the Indian epic Ramayana: ${KIRITA}; ` +
      `shoulder-length black hair below the crown; ${ROYAL_MALE}; a bright yellow silk pitambar dhoti; ` +
      "a red-and-gold silk uttariya draped over one shoulder; a long garland of fresh flowers (vaijayanti mala); " +
      "a red-and-white Vaishnava tilak (urdhva pundra) on the forehead; the great Kodanda bow in the left hand " +
      "and a quiver of arrows on the back. Calm, gentle, compassionate expression. Background: Ayodhya palace " +
      "terrace with carved sandstone pillars, temple shikharas and the Sarayu river at golden hour.",
  },
  lakshmana: {
    aspect: "3:4",
    costume:
      "Dress this person as Lakshmana, Rama's devoted younger brother, from the Indian epic Ramayana: " +
      "long, thick, wavy black hair falling well below the shoulders, the top gathered into a high topknot " +
      `bound with a gold band and a small gold kirita crown; ${ROYAL_MALE}; a saffron-red silk dhoti; ` +
      "a gold-bordered uttariya; a rudraksha-and-gold mala; a Vaishnava tilak; a strong bow in hand and a " +
      "quiver of arrows on the back. Alert, protective, loyal expression. Background: the Panchavati forest " +
      "hermitage with a thatched hut, banyan trees and the Godavari river in morning light.",
  },
  sita: {
    aspect: "3:4",
    costume:
      "Dress this person as Mata Sita, princess of Mithila, from the Indian epic Ramayana: a red and gold " +
      "Kanjeevaram silk saree draped in the ancient style, a delicate gold crown, a maang tikka, a nose ring (nath), " +
      "jhumka earrings, layered gold necklaces, gold armlets (bajuband), many bangles, sindoor in the hair parting, " +
      "a long braid with jasmine flowers, holding a lotus. Serene, graceful expression. Background: a palace " +
      "garden in Mithila with a lotus pond and carved stone pavilions at golden hour.",
  },
  hanuman: {
    aspect: "3:4",
    costume:
      "Dress this person as Lord Hanuman, the mighty vanara devotee of Rama, from the Indian epic Ramayana: " +
      "keep the human face exactly; add a long vanara tail curling up behind; a strong, powerful build; " +
      `${KIRITA}; bare chest with a sacred thread and gold necklaces; gold kundala earrings, keyura armlets and kadas; ` +
      "a saffron silk dhoti and sash; a saffron tilak. He rests HANUMAN'S GADA on his right shoulder: a traditional " +
      "Indian mace with a large round golden head as big as his own head, carved with vertical ribs and floral bands " +
      "and topped by a pointed lotus-bud finial, fixed on a long straight gold handle with a round pommel. The gada " +
      "must not look like a horn, trumpet, hammer or club. Devoted, fearless expression. Background: a Himalayan " +
      "peak above the clouds at sunrise, a saffron flag flying.",
  },
  ravan: {
    aspect: "4:3",
    costume:
      "Dress this person as Ravana, the mighty ten-headed king of Lanka, from the Indian epic Ramayana. " +
      "He has TEN HEADS in one horizontal row at shoulder height: the central, largest head is this person's own " +
      "face; the other nine heads are copies of the same face, four on one side and five on the other, each a " +
      "little smaller and set slightly back, each wearing its own tall gold kirita crown. One body only, broad and " +
      `powerful. ${ROYAL_MALE}; heavy jewelled gold ornaments; a black and deep-red silk dhoti; ` +
      "three horizontal white ash lines (tripundra) with a red dot on every forehead, as a devotee of Shiva; " +
      "the curved Chandrahas sword in hand. Proud, majestic, commanding expression. Background: the golden palace " +
      "of Lanka with towering Dravidian gopurams, a jewelled throne and the ocean at dusk.",
  },
  kumbkaran: {
    aspect: "3:4",
    costume:
      "Dress this person as Kumbhakarna, the giant warrior brother of Ravana, from the Indian epic Ramayana: " +
      `a huge, powerful, heavy build; ${KIRITA}; ${ROYAL_MALE}; a dark red silk dhoti; a huge gold-bound ` +
      "Indian war mace; three horizontal ash lines (tripundra) on the forehead. Hearty, good-humoured, " +
      "fearless expression. Background: a vast hall of Lanka's palace with carved pillars and platters of food.",
  },
  vibishan: {
    aspect: "3:4",
    costume:
      "Dress this person as Vibhishana, the righteous brother of Ravana, from the Indian epic Ramayana: " +
      `${KIRITA}; ${ROYAL_MALE}; an ivory-white and gold silk dhoti; a green-and-gold uttariya; a tulsi bead mala; ` +
      "a Vaishnava tilak; hands folded in namaste. Calm, wise, dignified expression. Background: a seaside " +
      "Dravidian temple terrace in Lanka in soft morning light.",
  },
  megnath: {
    aspect: "3:4",
    costume:
      "Dress this person as Indrajit (Meghanada), the invincible warrior prince of Lanka and son of Ravana, " +
      "from the Indian epic Ramayana. Lavishly ornamented: a tall jewelled gold kirita mukuta crown with rubies " +
      "and emeralds; large gold makara kundala earrings; five layers of gold necklaces with ruby pendants; a " +
      "gold breastplate (kavacha) engraved with temple-style lion and makara motifs, leaving the arms bare; " +
      "gold keyura armlets, wrist kadas and rings; a jewelled waist belt; a crimson silk dhoti; a flowing gold " +
      "uttariya; a great ornate gold bow and a quiver of glowing arrows. Young, handsome, confident, fearless, " +
      "with a proud faint smile and a regal stance. Background: standing in a golden celestial chariot (vimana) " +
      "among dark storm clouds and lightning above the golden towers of Lanka.",
  },
  bharat: {
    aspect: "3:4",
    costume:
      "Dress this person as Bharata, Rama's devoted brother who ruled in his name, from the Indian epic Ramayana: " +
      "hair tied up in a simple ascetic topknot (jata); a plain ochre bark-cloth (valkala) and cotton dhoti; " +
      "a sacred thread; rudraksha malas; three lines of sacred ash on the forehead; reverently holding Rama's " +
      "carved wooden sandals (padukas) in both hands at chest height. Humble, devoted expression. " +
      "Background: a simple hermitage at Nandigram with a thatched hut at soft sunrise.",
  },
  sugreev: {
    aspect: "3:4",
    costume:
      "Dress this person as Sugriva, the vanara king of Kishkindha, from the Indian epic Ramayana: keep the " +
      `human face exactly; add a long vanara tail curling behind; ${KIRITA}; ${ROYAL_MALE}; a green-and-gold ` +
      "silk dhoti; a garland of wild forest flowers (gaja-pushpa mala) around the neck; a mace in hand. " +
      "Noble, grateful, determined expression. Background: the rocky hills of Kishkindha above Pampa lake.",
  },
};

function buildPrompt(characterId, styleId) {
  const c = CHARACTERS[characterId];
  const style = STYLES[styleId];
  if (!c || !style) return null;
  return [FACE, c.costume, style, AUTHENTIC, FRAME].join(" ");
}

module.exports = { CHARACTERS, STYLES, buildPrompt };
