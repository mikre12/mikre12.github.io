/* ------------------------------------------------------------------
   YOUR PROJECTS — edit this file only; the site rebuilds itself.

   For each project:
     status : "planned" | "in-progress" | "completed"
     month  : "YYYY-MM"  (used to order the roadmap; planned/in-progress only)
     eta    : text shown on the card, e.g. "Dec 2026"
     links  : fill in repo / demo / writeup when ready. Empty = hidden.

   When you finish a project: set status to "completed", add the links,
   and (optionally) add a "result" line with a real, measurable outcome.
------------------------------------------------------------------- */
window.PROJECTS = [
  {
    id: "pentest-toolkit",
    title: "Pen-Test Automation Toolkit",
    category: "security",
    status: "planned",
    month: "2026-12",
    eta: "Dec 2026",
    summary:
      "A Python toolkit that chains reconnaissance, port and service scanning, and report generation into one repeatable pipeline for authorised lab targets.",
    highlights: ["Recon → scan → report in one command", "Clean HTML/PDF findings report", "Runs only against targets you own or are authorised to test"],
    stack: ["Python", "Nmap", "Requests", "Jinja2"],
    links: { repo: "", demo: "", writeup: "" }
  },
  {
    id: "secure-network-lab",
    title: "Secure Campus Network Design Lab",
    category: "security",
    status: "planned",
    month: "2026-12",
    eta: "Dec 2026",
    summary:
      "A segmented multi-site network designed and simulated end to end, with VLANs, access control lists, a firewall policy and site-to-site VPN, fully documented.",
    highlights: ["Topology diagram and addressing plan", "ACL / firewall rule rationale", "Step-by-step configuration write-up"],
    stack: ["Cisco Packet Tracer", "GNS3", "VLAN", "ACL", "VPN"],
    links: { repo: "", demo: "", writeup: "" }
  },
  {
    id: "phishing-detector",
    title: "Explainable Amharic–English Phishing Detector",
    category: "research",
    status: "planned",
    month: "2027-01",
    eta: "Jan 2027",
    summary:
      "A transformer-based classifier for mixed Amharic–English messages that shows which words drove each decision, with a small web demo.",
    highlights: ["Fine-tuned mBERT / XLM-RoBERTa", "SHAP and LIME explanations", "Interactive demo: paste a message, see the reasons"],
    stack: ["Python", "PyTorch", "Transformers", "SHAP", "LIME"],
    links: { repo: "", demo: "", writeup: "" }
  },
  {
    id: "mini-soc",
    title: "Mini SOC: SIEM & Alerting Lab",
    category: "security",
    status: "planned",
    month: "2027-02",
    eta: "Feb 2027",
    summary:
      "A home security-operations lab that collects logs from several machines, normalises them, and raises alerts from custom detection rules.",
    highlights: ["Central log pipeline", "Custom detection rules with test cases", "Dashboard of alerts over time"],
    stack: ["Wazuh / ELK", "Linux", "Python", "Docker"],
    links: { repo: "", demo: "", writeup: "" }
  },
  {
    id: "traffic-anomaly",
    title: "Network Traffic Anomaly Detection",
    category: "research",
    status: "planned",
    month: "2027-03",
    eta: "Mar 2027",
    summary:
      "Machine-learning detection of suspicious traffic in packet captures, compared against signature-based alerts from an IDS.",
    highlights: ["Feature extraction from PCAPs", "Comparison with Suricata rules", "Honest evaluation: precision, recall, false positives"],
    stack: ["Python", "scikit-learn", "Suricata", "Wireshark"],
    links: { repo: "", demo: "", writeup: "" }
  },
  {
    id: "verifiable-tracker",
    title: "Verifiable Product Tracker v2",
    category: "web",
    status: "planned",
    month: "2027-04",
    eta: "Apr 2027",
    summary:
      "A working prototype of the idea from my published paper: scan a product's code and check its authenticity against a blockchain record.",
    highlights: ["Smart contract for product registration", "React front end with QR verification", "Builds directly on the 2023 paper"],
    stack: ["Solidity", "React", "Node.js", "Web3"],
    links: { repo: "", demo: "", writeup: "" }
  },

  /* ---------- Earlier work ---------- */
  {
    id: "blockchain-verification",
    title: "Blockchain & NFT Product Verification",
    category: "research",
    status: "completed",
    year: "2023",
    summary:
      "Used blockchain to give products unique digital identifiers so consumers can verify authenticity and supply chains become more transparent. Published as a journal paper.",
    highlights: ["Published in IJSDR, May 2023"],
    stack: ["Blockchain", "NFT", "Supply chain"],
    links: { repo: "", demo: "", writeup: "#research" }
  },
  {
    id: "drowsiness-detection",
    title: "Driver Drowsiness Detection System",
    category: "security",
    status: "completed",
    year: "2019",
    summary:
      "A system that detects driver drowsiness using sensors and algorithms based on eye movement and facial expressions.",
    highlights: ["Eye-movement and facial-expression based detection"],
    stack: ["Sensors", "Computer vision", "Algorithms"],
    links: { repo: "", demo: "", writeup: "" }
  },
  {
    id: "hospital-management",
    title: "Hospital Management System",
    category: "web",
    status: "completed",
    year: "",
    summary:
      "Streamlined hospital operations such as patient registration, appointment scheduling and medical-record management.",
    highlights: ["Registration, scheduling and records in one system"],
    stack: ["Web app", "SQL"],
    links: { repo: "", demo: "", writeup: "" }
  }
];
