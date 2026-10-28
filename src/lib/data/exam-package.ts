import type { ExamQuestion, ExamSection, ExamStimulus } from "@/types/exam";
import * as fs from "node:fs";
import * as path from "node:path";

export const BENCHMARK_STIMULI: ExamStimulus[] = [
  {
    id: "stim-list-b1",
    sectionId: "sec-listening-01",
    title: "Part B: Conversation 1 — Course Registration and Prerequisites",
    content:
      "Two university students discuss registration hurdles for an advanced organic chemistry seminar and scheduling laboratory sections.",
    audioUrl:
      "https://kryyytvazyfjzddbhkmp.supabase.co/storage/v1/object/public/audio-stimuli/listening-part-b1.mp3",
    orderIndex: 1,
  },
  {
    id: "stim-list-b2",
    sectionId: "sec-listening-01",
    title: "Part B: Conversation 2 — Campus Internship in Environmental Science",
    content:
      "A student consults with a departmental advisor regarding a summer wetland restoration field project.",
    audioUrl:
      "https://kryyytvazyfjzddbhkmp.supabase.co/storage/v1/object/public/audio-stimuli/listening-part-b2.mp3",
    orderIndex: 2,
  },
  {
    id: "stim-list-c1",
    sectionId: "sec-listening-01",
    title: "Part C: Lecture 1 — Early American Architecture and Colonial Influences",
    content:
      "A professor lectures on the evolution of timber-frame construction and climate adaptation in eighteenth-century New England.",
    audioUrl:
      "https://kryyytvazyfjzddbhkmp.supabase.co/storage/v1/object/public/audio-stimuli/listening-part-c1.mp3",
    orderIndex: 3,
  },
  {
    id: "stim-list-c2",
    sectionId: "sec-listening-01",
    title: "Part C: Lecture 2 — Marine Biology: Deep-Sea Bioluminescence",
    content:
      "A lecture exploring biochemical mechanisms of luciferase reactions and evolutionary functions of photophores in bathypelagic organisms.",
    audioUrl:
      "https://kryyytvazyfjzddbhkmp.supabase.co/storage/v1/object/public/audio-stimuli/listening-part-c2.mp3",
    orderIndex: 4,
  },
  {
    id: "stim-list-c3",
    sectionId: "sec-listening-01",
    title: "Part C: Lecture 3 — Astronomy: Planetary Formation in Protoplanetary Disks",
    content:
      "An introductory astronomy lecture describing accretion processes, planetesimal collisions, and isotopic chondrule evidence.",
    audioUrl:
      "https://kryyytvazyfjzddbhkmp.supabase.co/storage/v1/object/public/audio-stimuli/listening-part-c3.mp3",
    orderIndex: 5,
  },
  {
    id: "stim-read-p1",
    sectionId: "sec-reading-03",
    title: "Passage 1: Glacial Morphology and Sedimentary Formations",
    content:
      "Glaciers are massive bodies of persistent ice that originate on land from the accumulation, compaction, and recrystallization of snow over decades or centuries. As glaciers move under the influence of gravity and internal deformation, they sculpt the underlying bedrock through plucking and abrasion. Erosional features such as striations, cirques, and U-shaped valleys bear testament to the immense kinetic force of advancing ice sheets. When temperatures rise and glaciers retreat, they deposit poorly sorted mixtures of boulders, gravel, sand, and clay known collectively as glacial till. Terminal moraines mark the farthest geographical advance of a glacier, providing geomorphologists with paleoclimatic timelines of the Pleistocene epoch.",
    audioUrl: null,
    orderIndex: 1,
  },
  {
    id: "stim-read-p2",
    sectionId: "sec-reading-03",
    title: "Passage 2: The Economic Transformation of the Erie Canal",
    content:
      "Completed in 1825, the Erie Canal traversed 363 miles across upstate New York, connecting the Hudson River at Albany with Lake Erie at Buffalo. Before its construction, the Appalachian Mountain range presented an imposing barrier to overland transportation, inflating the cost of moving agricultural bulk freight from the Midwestern frontier to Atlantic seaports. The canal precipitated a dramatic transport cost reduction—from nearly one hundred dollars per ton to under ten dollars—revolutionizing domestic commerce. New York City solidified its preeminent status as the commercial and financial capital of the United States, while interior settlements like Rochester and Syracuse burgeoned into prosperous manufacturing centers.",
    audioUrl: null,
    orderIndex: 2,
  },
  {
    id: "stim-read-p3",
    sectionId: "sec-reading-03",
    title: "Passage 3: Symbiotic Adaptations in Coral Reef Ecosystems",
    content:
      "Coral reefs represent some of the most biodiverse marine ecosystems on Earth, supported by a mutualistic symbiosis between hermatypic scleractinian corals and microscopic photosynthetic dinoflagellates known as zooxanthellae. Residing intracellularly within the gastrodermal cells of the coral polyp, zooxanthellae harness solar radiation to synthesize organic compounds via photosynthesis, transferring up to ninety percent of their photosynthate to the host coral. In return, the coral polyp provides the algae with metabolic waste products—chiefly ammonium and phosphate—along with a protected, sunlit environment. Elevated sea surface temperatures disrupt this metabolic equilibrium, causing corals to expel their symbionts in a catastrophic phenomenon known as coral bleaching.",
    audioUrl: null,
    orderIndex: 3,
  },
  {
    id: "stim-read-p4",
    sectionId: "sec-reading-03",
    title: "Passage 4: The Advent of Modernist Typography and the Bauhaus",
    content:
      "Founded in Weimar in 1919 by Walter Gropius, the Bauhaus school sought to bridge the chasm between fine art, craftsmanship, and industrial mass production. In the graphic arts, modernist pioneers such as Herbert Bayer and Jan Tschichold discarded ornamental nineteenth-century Victorian typefaces in favor of functionalist, sans-serif typography. Rejecting axial symmetry, Bauhaus designers championed dynamic asymmetric layouts, strict visual hierarchies governed by mathematical grid systems, and uncluttered negative space. The philosophy posited that letterforms should serve strictly as transparent vehicles for intellectual content rather than decorative embellishments, laying the foundational tenets for twentieth-century international typographic design.",
    audioUrl: null,
    orderIndex: 4,
  },
  {
    id: "stim-read-p5",
    sectionId: "sec-reading-03",
    title: "Passage 5: Subterranean Hydrology and Karst Topography",
    content:
      "Karst topography develops in regions where the underlying bedrock consists of soluble carbonate rocks, primarily limestone, dolomite, and gypsum. Rainwater absorbs carbon dioxide from the atmosphere and decaying organic soil matter, forming a weakly acidic dilute solution of carbonic acid. As this meteoric water percolates through microscopic joints and bedding planes, it dissolves calcium carbonate along structural fissures. Over geological spans, subsurface dissolution enlarges fractures into subterranean caverns, sinkholes, and disappearing streams. The hydrology of karst aquifers is characterized by turbulent conduit flow, making groundwater reserves exceptionally vulnerable to surface contaminants because natural subterranean filtration is largely absent.",
    audioUrl: null,
    orderIndex: 5,
  },
];

export function getBenchmarkExamSections(): ExamSection[] {
  const questionsPath = path.resolve(process.cwd(), "src/lib/data/seed-questions.json");
  let allQuestions: ExamQuestion[] = [];

  if (fs.existsSync(questionsPath)) {
    const raw = JSON.parse(fs.readFileSync(questionsPath, "utf-8"));
    allQuestions = raw.map((q: ExamQuestion) => ({
      id: q.id,
      sectionId: q.sectionId,
      stimulusId: q.stimulusId,
      questionNumber: q.questionNumber,
      prompt: q.prompt,
      optionA: q.optionA,
      optionB: q.optionB,
      optionC: q.optionC,
      optionD: q.optionD,
      skillCategory: q.skillCategory,
    }));
  }

  const listeningQuestions = allQuestions.filter((q) => q.sectionId === "sec-listening-01");
  const structureQuestions = allQuestions.filter((q) => q.sectionId === "sec-structure-02");
  const readingQuestions = allQuestions.filter((q) => q.sectionId === "sec-reading-03");

  const listeningStimuli = BENCHMARK_STIMULI.filter((s) => s.sectionId === "sec-listening-01");
  const readingStimuli = BENCHMARK_STIMULI.filter((s) => s.sectionId === "sec-reading-03");

  return [
    {
      id: "sec-listening-01",
      packageId: "pkg-toefl-itp-form-a",
      type: "LISTENING",
      orderIndex: 1,
      title: "Section 1: Listening Comprehension",
      durationMinutes: 35,
      totalItems: 50,
      stimuli: listeningStimuli,
      questions: listeningQuestions,
    },
    {
      id: "sec-structure-02",
      packageId: "pkg-toefl-itp-form-a",
      type: "STRUCTURE",
      orderIndex: 2,
      title: "Section 2: Structure & Written Expression",
      durationMinutes: 25,
      totalItems: 40,
      questions: structureQuestions,
    },
    {
      id: "sec-reading-03",
      packageId: "pkg-toefl-itp-form-a",
      type: "READING",
      orderIndex: 3,
      title: "Section 3: Reading Comprehension",
      durationMinutes: 55,
      totalItems: 50,
      stimuli: readingStimuli,
      questions: readingQuestions,
    },
  ];
}
