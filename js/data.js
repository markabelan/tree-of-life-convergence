export const DOMAIN_COLORS = {
  eukaryotes: 0x7fb389,
  archaea: 0xd08458,
  bacteria: 0x9aa8b8,
  root: 0xc9a227,
};

export const TRAITS = {
  motors: {
    id: "motors",
    label: "Swimming motors",
    note: "Three domains, three machines",
    help: "A whip for swimming, invented three times: bacterial flagellum, archaeal archaellum, eukaryotic flagellum.",
    examples: [
      {
        tip: "gamma",
        name: "E. coli",
        latin: "Escherichia coli",
        image: "img/ecoli.png",
        blurb: "A bacterial rotary flagellum — a motor with no kinship to the other two designs.",
      },
      {
        tip: "halophiles",
        name: "Halobacterium",
        latin: "Halobacterium salinarum",
        image: "img/halo.png",
        blurb: "An archaeal archaellum: the same job — swimming — built from different proteins.",
      },
      {
        tip: "euglenids",
        name: "Euglena",
        latin: "Euglena gracilis",
        image: "img/euglena.jpg",
        blurb: "A eukaryotic flagellum of microtubules, on a branch that split before animals or plants.",
      },
    ],
  },
  heat: {
    id: "heat",
    label: "Heat-loving life",
    note: "Bacteria and archaea",
    help: "Living near the boiling point — solved on both sides of the prokaryotic split.",
    examples: [
      {
        tip: "thermotogales",
        name: "Thermotoga",
        latin: "Thermotoga maritima",
        image: "img/thermotoga.png",
        blurb: "A bacterium in a toga-like sheath, at home near 80°C hydrothermal vents.",
      },
      {
        tip: "sulfolobus",
        name: "Sulfolobus",
        latin: "Sulfolobus acidocaldarius",
        image: "img/sulfolobus.jpg",
        blurb: "An archaeon of boiling acidic springs, where most proteins should fall apart.",
      },
      {
        tip: "pyrococcus",
        name: "Pyrococcus",
        latin: "Pyrococcus furiosus",
        image: "img/pyrococcus.jpg",
        blurb: "A euryarchaeon that thrives above 100°C — heat tolerance on a separate archaeal branch.",
      },
    ],
  },
  carbon: {
    id: "carbon",
    label: "Carbon from air",
    note: "Bacteria and archaea",
    help: "Two recipes for pulling living carbon out of CO₂, on opposite prokaryotic branches.",
    examples: [
      {
        tip: "cyanobacteria",
        name: "Prochlorococcus",
        latin: "Prochlorococcus marinus",
        image: "img/prochloro.jpg",
        blurb: "The ocean’s most abundant photosynthesizer, fixing carbon with sunlight.",
      },
      {
        tip: "methanobacterium",
        name: "Methanobacterium",
        latin: "Methanobacterium",
        image: "img/methano.jpg",
        blurb: "An archaeon that builds biomass from CO₂ and hydrogen, and breathes out methane.",
      },
    ],
  },
  carcinization: {
    id: "carcinization",
    label: "Carcinization",
    note: "Crabs, again and again",
    help: "Evolution keeps making crabs — a short, wide body, evolved many times in crustaceans.",
    examples: [
      {
        tip: "brachyura",
        name: "Blue crab",
        latin: "Callinectes sapidus",
        image: "img/blue-crab.jpg",
        blurb: "A true crab: the classic wide carapace evolution keeps rediscovering.",
      },
      {
        tip: "anomura",
        name: "Coconut crab",
        latin: "Birgus latro",
        image: "img/coconut-crab.jpg",
        blurb: "An anomuran that arrived at the crab shape on a separate crustacean branch.",
      },
    ],
  },
  antifreeze: {
    id: "antifreeze",
    label: "Antifreeze proteins",
    note: "Arctic and Antarctic fish",
    help: "The same icy-blood trick, invented separately at opposite poles.",
    examples: [
      {
        tip: "arctic-cod",
        name: "Arctic cod",
        latin: "Boreogadus saida",
        image: "img/arctic-cod.jpg",
        blurb: "Northern fishes that keep their blood from freezing with antifreeze proteins.",
      },
      {
        tip: "toothfish",
        name: "Antarctic toothfish",
        latin: "Dissostichus mawsoni",
        image: "img/toothfish.jpg",
        blurb: "A Southern Ocean hunter with its own, independently evolved antifreeze.",
      },
    ],
  },
  c4: {
    id: "c4",
    label: "C4 photosynthesis",
    note: "Grasses and saltbushes",
    help: "A drought-and-sunlight pathway that evolved more than 60 times in flowering plants.",
    examples: [
      {
        tip: "grasses",
        name: "Maize",
        latin: "Zea mays",
        image: "img/maize.jpg",
        blurb: "C4 arose some 20 times in grasses alone — maize is one famous product.",
      },
      {
        tip: "atriplex",
        name: "Saltbush",
        latin: "Atriplex",
        image: "img/atriplex.jpg",
        blurb: "A eudicot lineage that found the same high-light, arid-land biochemistry.",
      },
    ],
  },
  electric: {
    id: "electric",
    label: "Electric fish",
    note: "Africa and South America",
    help: "Muscles recast as batteries — once in African elephantfish, once in South American knifefish.",
    examples: [
      {
        tip: "knifefish",
        name: "Electric eel",
        latin: "Electrophorus electricus",
        image: "img/electric-eel.jpg",
        blurb: "A South American knifefish that pulses for sensing — and can stun prey.",
      },
      {
        tip: "elephantfish",
        name: "Elephantnose fish",
        latin: "Gnathonemus petersii",
        image: "img/cornish-jack.jpg",
        blurb: "An African mormyrid — same radiation as the Cornish jack — with its own electric organ.",
      },
    ],
  },
  tongues: {
    id: "tongues",
    label: "Ballistic tongues",
    note: "Chameleons and salamanders",
    help: "The same shooting tongue, in animals hundreds of millions of years apart.",
    examples: [
      {
        tip: "chameleon",
        name: "Veiled chameleon",
        latin: "Chamaeleo calyptratus",
        image: "img/chameleon.jpg",
        blurb: "A lizard that fires a sticky tongue farther than its own body length.",
      },
      {
        tip: "salamander",
        name: "Lungless salamander",
        latin: "Hydromantes platycephalus",
        image: "img/salamander.jpg",
        blurb: "A woodland amphibian that independently engineered the same ballistic strike.",
      },
    ],
  },
  intelligence: {
    id: "intelligence",
    label: "Intelligence",
    note: "Apes, crows, octopuses",
    help: "Complex cognition in apes, corvids, and cephalopods — three brains, no shared blueprint.",
    examples: [
      {
        tip: "chimpanzee",
        name: "Chimpanzee",
        latin: "Pan troglodytes",
        image: "img/chimp.jpg",
        blurb: "A primate mind: tools, politics, and a brain that keeps rewriting itself.",
      },
      {
        tip: "corvids",
        name: "New Caledonian crow",
        latin: "Corvus moneduloides",
        image: "img/crow.jpg",
        blurb: "A bird that shapes tools — intelligence on a separate vertebrate branch.",
      },
      {
        tip: "cephalopods",
        name: "Common octopus",
        latin: "Octopus vulgaris",
        image: "img/octopus.jpg",
        blurb: "A mollusc with a distributed nervous system and a talent for solving puzzles.",
      },
    ],
  },
  echolocation: {
    id: "echolocation",
    label: "Echolocation",
    note: "Bats and dolphins",
    help: "The hearing protein Prestin — and other genes — converged in bats and toothed whales.",
    examples: [
      {
        tip: "bats",
        name: "Little brown bat",
        latin: "Myotis lucifugus",
        image: "img/bat.jpg",
        blurb: "A microbat that hears its own clicks, with Prestin tuned for high frequencies.",
      },
      {
        tip: "dolphins",
        name: "Bottlenose dolphin",
        latin: "Tursiops truncatus",
        image: "img/dolphin.jpg",
        blurb: "A whale that echolocates underwater — same sensory trick, different world.",
      },
    ],
  },
  pheromone: {
    id: "pheromone",
    label: "Sex attractant",
    note: "Butterflies and elephants",
    help: "The same molecule, (Z)-7-dodecen-1-yl acetate, used as a sex lure in moths, butterflies — and Asian elephants.",
    examples: [
      {
        tip: "butterflies",
        name: "Cabbage butterfly",
        latin: "Pieris rapae",
        image: "img/butterfly.jpg",
        blurb: "One of many lepidopterans that advertise with this exact acetate compound.",
      },
      {
        tip: "elephants",
        name: "Asian elephant",
        latin: "Elephas maximus",
        image: "img/elephant.jpg",
        blurb: "The same molecule, in urine, tells bulls that a cow is ready to mate.",
      },
    ],
  },
  doppelgangers: {
    id: "doppelgangers",
    label: "Meadowlarks & longclaws",
    note: "Lookalikes on two continents",
    help: "Open-country birds that match in niche, shape, and yellow-and-black dress — and are not close kin.",
    examples: [
      {
        tip: "meadowlark",
        name: "Western meadowlark",
        latin: "Sturnella neglecta",
        image: "img/meadowlark.jpg",
        blurb: "A North American icterid of grasslands, black V on a yellow breast.",
      },
      {
        tip: "longclaw",
        name: "Yellow-throated longclaw",
        latin: "Macronyx croceus",
        image: "img/longclaw.jpg",
        blurb: "An African pipit relative playing the same part, in the same costume.",
      },
    ],
  },
  cavities: {
    id: "cavities",
    label: "Cavity nesters",
    note: "Swallows and warblers",
    help: "Compete for scarce nest holes, and aggression — even brain chemistry — evolves to match.",
    examples: [
      {
        tip: "swallows",
        name: "Barn swallow",
        latin: "Hirundo rustica",
        image: "img/swallow.jpg",
        blurb: "A cavity-adjacent nester whose boldness is part of the hole-scarcity story.",
      },
      {
        tip: "warblers",
        name: "Prothonotary warbler",
        latin: "Protonotaria citrea",
        image: "img/warbler.jpg",
        blurb: "A warbler that fights for tree cavities — same pressure, separate songbird branch.",
      },
    ],
  },
};

const V3 = (x, y, z) => [x, y, z];

export const TREE = {
  id: "root",
  name: "LUCA",
  domain: "root",
  length: 0.55,
  spread: 0.2,
  children: [
        {
          id: "bacteria",
          name: "Bacteria",
          domain: "bacteria",
          length: 2.35,
          direction: V3(0.78, -0.22, 0.58),
          spread: 1.18,
      children: [
        {
          id: "thermophiles-b",
          name: "Deep-branching thermophiles",
          domain: "bacteria",
          length: 1.15,
          spread: 0.45,
          children: [
            { id: "thermotogales", name: "Thermotogales", domain: "bacteria", length: 0.85 },
            { id: "aquificae", name: "Aquificae", domain: "bacteria", length: 0.72 },
          ],
        },
        { id: "firmicutes", name: "Firmicutes", domain: "bacteria", length: 1.55 },
        { id: "actinobacteria", name: "Actinobacteria", domain: "bacteria", length: 1.42 },
        {
          id: "cyanoline",
          name: "Cyanobacteria + plastids",
          domain: "bacteria",
          length: 1.2,
          spread: 0.38,
          children: [
            { id: "cyanobacteria", name: "Cyanobacteria", domain: "bacteria", length: 0.95 },
            { id: "plastids", name: "Plastids", domain: "bacteria", length: 0.7 },
            { id: "deinococcus", name: "Deinococcus / Thermus", domain: "bacteria", length: 0.82 },
          ],
        },
        { id: "chlorobi", name: "Chlorobi", domain: "bacteria", length: 1.28 },
        { id: "cfb", name: "CFB group", domain: "bacteria", length: 1.18 },
        { id: "chlamydia", name: "Chlamydia", domain: "bacteria", length: 1.05 },
        { id: "planctomycetes", name: "Planctomycetes", domain: "bacteria", length: 1.12 },
        { id: "spirochaetes", name: "Spirochaetes", domain: "bacteria", length: 1.22 },
        {
          id: "proteobacteria",
          name: "Proteobacteria",
          domain: "bacteria",
          length: 1.35,
          spread: 0.62,
          children: [
            { id: "epsilon", name: "ε-proteobacteria", domain: "bacteria", length: 0.82 },
            { id: "delta", name: "δ-proteobacteria", domain: "bacteria", length: 0.9 },
            { id: "alpha", name: "α-proteobacteria", domain: "bacteria", length: 0.78 },
            { id: "mitochondria", name: "Mitochondria", domain: "bacteria", length: 0.66 },
            { id: "beta", name: "β-proteobacteria", domain: "bacteria", length: 0.84 },
            { id: "gamma", name: "γ-proteobacteria", domain: "bacteria", length: 1.05 },
          ],
        },
        {
          id: "pvc-ish",
          name: "PVC / Acidobacteria",
          domain: "bacteria",
          length: 1.05,
          spread: 0.42,
          children: [
            { id: "acidobacteria", name: "Acidobacteria", domain: "bacteria", length: 0.8 },
            { id: "op11", name: "OP11", domain: "bacteria", length: 0.7 },
            { id: "verrucomicrobia", name: "Verrucomicrobia", domain: "bacteria", length: 0.88 },
            { id: "chloroflexi", name: "Chloroflexi", domain: "bacteria", length: 0.92 },
          ],
        },
      ],
    },
        {
          id: "archaea",
          name: "Archaea",
          domain: "archaea",
          length: 2.2,
          direction: V3(-0.82, 0.06, -0.56),
          spread: 0.88,
      children: [
        {
          id: "crenarchaea",
          name: "Crenarchaea",
          domain: "archaea",
          length: 1.25,
          spread: 0.55,
          children: [
            { id: "crenarchaeum", name: "Crenarchaeum", domain: "archaea", length: 0.95 },
            { id: "korarchaeota", name: "Korarchaeota", domain: "archaea", length: 0.82 },
            { id: "desulfurococcus", name: "Desulfurococcus", domain: "archaea", length: 0.88 },
            { id: "sulfolobus", name: "Sulfolobus", domain: "archaea", length: 1.05 },
            { id: "aeropyrum", name: "Aeropyrum", domain: "archaea", length: 0.78 },
            { id: "pyrobaculum", name: "Pyrobaculum", domain: "archaea", length: 0.86 },
            { id: "thermofilum", name: "Thermofilum", domain: "archaea", length: 0.7 },
            { id: "nanoarchaeota", name: "Nanoarchaeota", domain: "archaea", length: 0.74 },
          ],
        },
        {
          id: "euryarchaea",
          name: "Euryarchaea",
          domain: "archaea",
          length: 1.32,
          spread: 0.7,
          children: [
            { id: "archaeoglobus", name: "Archaeoglobus", domain: "archaea", length: 0.9 },
            { id: "halophiles", name: "Halophiles", domain: "archaea", length: 1.12 },
            { id: "methanosarcina", name: "Methanosarcina", domain: "archaea", length: 1.0 },
            { id: "methanospirillum", name: "Methanospirillum", domain: "archaea", length: 0.95 },
            { id: "anne1", name: "ANME-1", domain: "archaea", length: 0.78 },
            { id: "methanothermus", name: "Methanothermus", domain: "archaea", length: 0.82 },
            { id: "thermoplasma", name: "Thermoplasma", domain: "archaea", length: 0.88 },
            { id: "methanopyrus", name: "Methanopyrus", domain: "archaea", length: 0.84 },
            { id: "pyrococcus", name: "Pyrococcus", domain: "archaea", length: 1.08 },
            { id: "methanobacterium", name: "Methanobacterium", domain: "archaea", length: 0.92 },
          ],
        },
      ],
    },
        {
          id: "eukaryotes",
          name: "Eukaryotes",
          domain: "eukaryotes",
          length: 2.55,
          direction: V3(0.12, 0.86, -0.49),
          spread: 1.12,
      children: [
        {
          id: "opisthokonts",
          name: "Opisthokonts",
          domain: "eukaryotes",
          length: 1.15,
          direction: V3(-0.42, 0.78, -0.46),
          spread: 0.55,
          children: [
            {
              id: "animals",
              name: "Animals",
              domain: "eukaryotes",
              length: 1.2,
              spread: 1.22,
              children: [
                {
                  id: "arthropods",
                  name: "Arthropods",
                  domain: "eukaryotes",
                  length: 1.05,
                  spread: 0.72,
                  children: [
                    {
                      id: "insects",
                      name: "Insects",
                      domain: "eukaryotes",
                      length: 0.85,
                      spread: 0.4,
                      children: [
                        { id: "butterflies", name: "Butterflies", domain: "eukaryotes", length: 1.05 },
                      ],
                    },
                    {
                      id: "crustaceans",
                      name: "Crustaceans",
                      domain: "eukaryotes",
                      length: 0.95,
                      spread: 0.5,
                      children: [
                        {
                          id: "decapods",
                          name: "Decapods",
                          domain: "eukaryotes",
                          length: 0.72,
                          spread: 0.42,
                          children: [
                            { id: "brachyura", name: "True crabs", domain: "eukaryotes", length: 1.12 },
                            { id: "anomura", name: "Anomurans", domain: "eukaryotes", length: 1.08 },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "molluscs",
                  name: "Molluscs",
                  domain: "eukaryotes",
                  length: 1.05,
                  spread: 0.4,
                  children: [
                    { id: "cephalopods", name: "Cephalopods", domain: "eukaryotes", length: 1.35 },
                  ],
                },
                {
                  id: "chordates",
                  name: "Chordates",
                  domain: "eukaryotes",
                  length: 1.15,
                  spread: 0.9,
                  children: [
                    {
                      id: "fishes",
                      name: "Fishes",
                      domain: "eukaryotes",
                      length: 1.05,
                      spread: 0.82,
                      children: [
                        {
                          id: "osteoglossomorphs",
                          name: "Osteoglossomorphs",
                          domain: "eukaryotes",
                          length: 0.78,
                          spread: 0.28,
                          children: [
                            { id: "elephantfish", name: "Elephantfish", domain: "eukaryotes", length: 1.1 },
                          ],
                        },
                        {
                          id: "gadiforms",
                          name: "Gadiforms",
                          domain: "eukaryotes",
                          length: 0.82,
                          spread: 0.28,
                          children: [
                            { id: "arctic-cod", name: "Arctic cod", domain: "eukaryotes", length: 1.05 },
                          ],
                        },
                        {
                          id: "percomorphs",
                          name: "Percomorphs",
                          domain: "eukaryotes",
                          length: 0.86,
                          spread: 0.28,
                          children: [
                            { id: "toothfish", name: "Notothenioids", domain: "eukaryotes", length: 1.12 },
                          ],
                        },
                        {
                          id: "ostariophysi",
                          name: "Ostariophysi",
                          domain: "eukaryotes",
                          length: 0.84,
                          spread: 0.28,
                          children: [
                            { id: "knifefish", name: "Knifefish", domain: "eukaryotes", length: 1.08 },
                          ],
                        },
                      ],
                    },
                    {
                      id: "tetrapods",
                      name: "Tetrapods",
                      domain: "eukaryotes",
                      length: 1.1,
                      spread: 0.88,
                      children: [
                        {
                          id: "amphibians",
                          name: "Amphibians",
                          domain: "eukaryotes",
                          length: 0.92,
                          spread: 0.32,
                          children: [
                            { id: "salamander", name: "Salamanders", domain: "eukaryotes", length: 1.05 },
                          ],
                        },
                        {
                          id: "amniotes",
                          name: "Amniotes",
                          domain: "eukaryotes",
                          length: 1.02,
                          spread: 0.78,
                          children: [
                            {
                              id: "squamates",
                              name: "Squamates",
                              domain: "eukaryotes",
                              length: 0.88,
                              spread: 0.3,
                              children: [
                                { id: "chameleon", name: "Chameleons", domain: "eukaryotes", length: 1.12 },
                              ],
                            },
                            {
                              id: "birds",
                              name: "Birds",
                              domain: "eukaryotes",
                              length: 1.05,
                              spread: 0.9,
                              children: [
                                { id: "corvids", name: "Corvids", domain: "eukaryotes", length: 0.95 },
                                {
                                  id: "icterids",
                                  name: "Icterids",
                                  domain: "eukaryotes",
                                  length: 0.72,
                                  spread: 0.28,
                                  children: [
                                    { id: "meadowlark", name: "Meadowlarks", domain: "eukaryotes", length: 1.0 },
                                  ],
                                },
                                {
                                  id: "motacillids",
                                  name: "Pipits and longclaws",
                                  domain: "eukaryotes",
                                  length: 0.74,
                                  spread: 0.28,
                                  children: [
                                    { id: "longclaw", name: "Longclaws", domain: "eukaryotes", length: 1.02 },
                                  ],
                                },
                                { id: "swallows", name: "Swallows", domain: "eukaryotes", length: 0.92 },
                                { id: "warblers", name: "Warblers", domain: "eukaryotes", length: 0.98 },
                              ],
                            },
                            {
                              id: "mammals",
                              name: "Mammals",
                              domain: "eukaryotes",
                              length: 1.08,
                              spread: 0.78,
                              children: [
                                { id: "bats", name: "Bats", domain: "eukaryotes", length: 1.05 },
                                {
                                  id: "primates",
                                  name: "Primates",
                                  domain: "eukaryotes",
                                  length: 0.7,
                                  spread: 0.28,
                                  children: [
                                    { id: "chimpanzee", name: "Apes", domain: "eukaryotes", length: 0.95 },
                                  ],
                                },
                                {
                                  id: "cetaceans",
                                  name: "Cetaceans",
                                  domain: "eukaryotes",
                                  length: 0.78,
                                  spread: 0.28,
                                  children: [
                                    { id: "dolphins", name: "Dolphins", domain: "eukaryotes", length: 1.1 },
                                  ],
                                },
                                { id: "elephants", name: "Elephants", domain: "eukaryotes", length: 0.92 },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            { id: "choanoflagellates", name: "Choanoflagellates", domain: "eukaryotes", length: 0.72 },
            { id: "fungi", name: "Fungi", domain: "eukaryotes", length: 1.05 },
            { id: "nucleariids", name: "Nucleariids", domain: "eukaryotes", length: 0.62 },
            { id: "mesomycetozoa", name: "Mesomycetozoa", domain: "eukaryotes", length: 0.58 },
          ],
        },
        {
          id: "amoebozoa",
          name: "Amoebozoa",
          domain: "eukaryotes",
          length: 1.05,
          spread: 0.4,
          children: [
            { id: "cellular-slime", name: "Cellular slime molds", domain: "eukaryotes", length: 0.82 },
            { id: "plasmodial-slime", name: "Plasmodial slime molds", domain: "eukaryotes", length: 0.78 },
            { id: "amoebas", name: "Amoebas", domain: "eukaryotes", length: 0.7 },
          ],
        },
        {
          id: "rhizaria",
          name: "Rhizaria",
          domain: "eukaryotes",
          length: 1.12,
          spread: 0.42,
          children: [
            { id: "cercozoans", name: "Cercozoans", domain: "eukaryotes", length: 0.7 },
            { id: "foraminifera", name: "Foraminifera", domain: "eukaryotes", length: 0.86 },
            { id: "radiolarians", name: "Radiolarians", domain: "eukaryotes", length: 0.8 },
            { id: "chlorarachniophytes", name: "Chlorarachniophytes", domain: "eukaryotes", length: 0.66 },
          ],
        },
        {
          id: "plants",
          name: "Plants",
          domain: "eukaryotes",
          length: 1.22,
          direction: V3(0.22, 0.96, 0.15),
          spread: 0.48,
          children: [
            {
              id: "land-plants",
              name: "Land plants",
              domain: "eukaryotes",
              length: 1.12,
              spread: 0.58,
              children: [
                {
                  id: "monocots",
                  name: "Monocots",
                  domain: "eukaryotes",
                  length: 0.82,
                  spread: 0.32,
                  children: [
                    { id: "grasses", name: "Grasses", domain: "eukaryotes", length: 1.05 },
                  ],
                },
                {
                  id: "eudicots",
                  name: "Eudicots",
                  domain: "eukaryotes",
                  length: 0.86,
                  spread: 0.32,
                  children: [
                    { id: "atriplex", name: "Saltbushes", domain: "eukaryotes", length: 0.98 },
                  ],
                },
              ],
            },
            { id: "green-algae", name: "Green algae", domain: "eukaryotes", length: 0.82 },
            { id: "red-algae", name: "Red algae", domain: "eukaryotes", length: 0.76 },
            { id: "glaucophytes", name: "Glaucophyte algae", domain: "eukaryotes", length: 0.64 },
          ],
        },
        {
          id: "alveolates",
          name: "Alveolates",
          domain: "eukaryotes",
          length: 1.08,
          spread: 0.4,
          children: [
            { id: "ciliates", name: "Ciliates", domain: "eukaryotes", length: 0.78 },
            { id: "dinoflagellates", name: "Dinoflagellates", domain: "eukaryotes", length: 0.86 },
            { id: "apicomplexa", name: "Apicomplexa", domain: "eukaryotes", length: 0.7 },
            { id: "syndiniales", name: "Syndiniales", domain: "eukaryotes", length: 0.58 },
          ],
        },
        {
          id: "heterokonts",
          name: "Heterokonts",
          domain: "eukaryotes",
          length: 1.18,
          spread: 0.46,
          children: [
            { id: "diatoms", name: "Diatoms", domain: "eukaryotes", length: 0.88 },
            { id: "phaeophytes", name: "Phaeophytes", domain: "eukaryotes", length: 1.02 },
            { id: "chrysophytes", name: "Chrysophytes", domain: "eukaryotes", length: 0.7 },
            { id: "oomycetes", name: "Oomycetes", domain: "eukaryotes", length: 0.66 },
            { id: "labyrinthulids", name: "Labyrinthulids", domain: "eukaryotes", length: 0.6 },
          ],
        },
        {
          id: "discicristates",
          name: "Discicristates",
          domain: "eukaryotes",
          length: 1.0,
          spread: 0.38,
          children: [
            { id: "euglenids", name: "Euglenids", domain: "eukaryotes", length: 0.72 },
            { id: "trypanosomes", name: "Trypanosomes", domain: "eukaryotes", length: 0.8 },
            { id: "leishmanias", name: "Leishmanias", domain: "eukaryotes", length: 0.68 },
            { id: "acrasid-slime", name: "Acrasid slime molds", domain: "eukaryotes", length: 0.74 },
          ],
        },
        {
          id: "excavates",
          name: "Excavates",
          domain: "eukaryotes",
          length: 0.95,
          spread: 0.36,
          children: [
            { id: "jakobids", name: "Core jakobids", domain: "eukaryotes", length: 0.66 },
            { id: "parabasalids", name: "Parabasalids", domain: "eukaryotes", length: 0.72 },
            { id: "diplomonads", name: "Diplomonads", domain: "eukaryotes", length: 0.7 },
            { id: "oxymonads", name: "Oxymonads", domain: "eukaryotes", length: 0.58 },
          ],
        },
        { id: "haptophytes", name: "Haptophytes", domain: "eukaryotes", length: 0.82 },
        { id: "cryptophytes", name: "Cryptophytes", domain: "eukaryotes", length: 0.76 },
      ],
    },
  ],
};

function addTwigs(node, depth = 0) {
  const kids = node.children;
  if (!kids) return;
  kids.forEach((child) => addTwigs(child, depth + 1));
  if (depth < 2 || kids.length === 0 || kids.length > 9) return;
  const extra = kids.length <= 3 ? 3 : 2;
  for (let i = 0; i < extra; i += 1) {
    kids.push({
      id: `${node.id}-twig-${i}`,
      name: "",
      domain: node.domain,
      length: 0.38 + ((i * 13 + node.id.length) % 8) * 0.05,
    });
  }
}

addTwigs(TREE);
