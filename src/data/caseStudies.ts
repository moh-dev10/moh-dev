export type ProjectStatus = "completed" | "target";

export interface CaseStudyFeature {
  title: string;
  description: string;
  status: "Completed" | "Architectural Target";
}

export interface CaseStudyTechCategory {
  category: string;
  items: string[];
  note?: string;
}

export interface CaseStudyArchitectureDecision {
  title: string;
  reason: string;
}

export interface CaseStudyProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface CaseStudyShowcaseItem {
  url: string;
  caption: string;
  tag: string;
}

export interface CaseStudyData {
  slug: string;
  projectSlug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  role: string;
  timeline: string;
  heroImage: string;
  liveUrl?: string;
  overview: {
    summary: string;
    purpose: string;
    targetAudience: string;
    specs: { label: string; value: string }[];
  };
  challenge: {
    title: string;
    context: string;
    points: { title: string; description: string }[];
  };
  solution: {
    title: string;
    summary: string;
    pillars: { title: string; description: string; tag: string }[];
  };
  architecture: {
    title: string;
    description: string;
    techStack: CaseStudyTechCategory[];
    decisions: CaseStudyArchitectureDecision[];
  };
  keyFeatures: CaseStudyFeature[];
  developmentProcess: CaseStudyProcessStep[];
  showcase: {
    title: string;
    description: string;
    items: CaseStudyShowcaseItem[];
  };
  nextProject?: {
    slug: string;
    title: string;
    category: string;
    hasCaseStudy?: boolean;
  };
}

export const caseStudies: Record<"en" | "ar", Record<string, CaseStudyData>> = {
  en: {
    darna: {
      slug: "darna",
      projectSlug: "darna",
      title: "DARNA",
      subtitle: "Conversion-Focused Landing Page & Custom Algerian Logistics Engine",
      category: "E-Commerce Business System",
      year: "2026",
      role: "Full-Stack Web Development & Architecture",
      timeline: "Delivered & Production-Ready",
      heroImage: "/projects/darna.webp",
      liveUrl: "https://darna.wldelroudjishoes.com",
      overview: {
        summary:
          "DARNA is an end-to-end e-commerce solution engineered for the Algerian market. It pairs a high-velocity, mobile-first product landing page with a custom WordPress backend dashboard that centralizes cash-on-delivery (COD) orders, 58-wilaya shipping tariffs, courier fulfillment workflows, and multi-channel marketing tracking.",
        purpose:
          "Provide Algerian retail merchants with an ultra-fast purchasing experience that eliminates checkout abandonment while consolidating fragmented operational tasks (order confirmation, courier dispatch, and wilaya shipping rates) into a single unified control center.",
        targetAudience:
          "Algerian e-commerce operators running direct-response marketing campaigns on social media, requiring robust COD management across all 58 national wilayas.",
        specs: [
          { label: "Architecture", value: "Custom WordPress Plugin & Theme" },
          { label: "Frontend", value: "JavaScript · Tailwind CSS" },
          { label: "Backend", value: "PHP · REST API" },
          { label: "Logistics Scope", value: "58 Algerian Wilayas (Home & Desk)" },
        ],
      },
      challenge: {
        title: "The Operational Reality of Algerian E-Commerce",
        context:
          "Operating an e-commerce brand in Algeria presents distinct technical and logistical hurdles that generic global platforms like standard WooCommerce or Shopify cannot resolve out-of-the-box.",
        points: [
          {
            title: "Dominance of Cash-on-Delivery (COD)",
            description:
              "Online shoppers overwhelmingly rely on Cash-on-Delivery. Traditional multi-step checkout funnels with carts and billing addresses introduce friction and lead to heavy bounce rates on mobile networks.",
          },
          {
            title: "58-Wilaya Pricing & Delivery Discrepancies",
            description:
              "Shipping rates differ widely between home delivery (à domicile) and office pickup (stop-desk) across 58 wilayas and hundreds of municipalities. Managing flat rates or manually calculating fees causes revenue loss.",
          },
          {
            title: "Logistics Fragmentation",
            description:
              "Merchants frequently switch between or combine local delivery courier services to ensure coverage, requiring a clean abstraction layer rather than tight coupling to one proprietary courier API.",
          },
          {
            title: "Ad Attribution Gaps in COD Cycles",
            description:
              "Running ad campaigns across Meta, TikTok, and Google requires precise conversion event triggers at the exact moment an order is confirmed, avoiding duplicate submissions from mobile refresh habits.",
          },
        ],
      },
      solution: {
        title: "A Purpose-Built Architecture for Maximum Speed & Operational Control",
        summary:
          "Rather than stacking dozens of heavy third-party plugins that degrade page performance, DARNA was engineered as a custom WordPress solution. The system separates the customer-facing landing page from the administrative operations dashboard.",
        pillars: [
          {
            tag: "Checkout UX",
            title: "1-Click Direct Order Flow",
            description:
              "Replaced standard e-commerce cart pages with an instant, single-step ordering form. Visitors select product options, pick their wilaya, and see updated delivery fees immediately without full-page reloads.",
          },
          {
            tag: "Back Office",
            title: "Custom Operations Dashboard",
            description:
              "Built a dedicated administrative interface inside WordPress to view incoming orders, update call verification states, inspect delivery tracking statuses, and filter by courier.",
          },
          {
            tag: "Data Structure",
            title: "58-Wilaya Hierarchical Matrix",
            description:
              "Structured national postal and wilaya data with dual tariff tracking (home delivery vs pickup point), enabling exact shipping cost calculations across all Algerian territories.",
          },
          {
            tag: "Attribution",
            title: "Synchronized Event Tracking",
            description:
              "Integrated Meta Pixel, TikTok Pixel, and Google Tracking to fire unified purchase and lead events immediately upon validated order submission.",
          },
        ],
      },
      architecture: {
        title: "Technical Architecture & System Design",
        description:
          "The architectural approach prioritizes lightweight execution, security against duplicate submissions, and maintainable data contracts.",
        techStack: [
          {
            category: "Core Platform",
            items: ["WordPress (Custom CMS Core)", "PHP 8.x Architecture", "Custom WordPress Plugin Structure"],
            note: "Built without third-party page builders to guarantee fast initial render.",
          },
          {
            category: "Client & UI",
            items: ["Tailwind CSS", "Modern Vanilla JavaScript", "Responsive Mobile-First Layout"],
            note: "Optimized for 4G mobile connections with minimal asset bundle footprint.",
          },
          {
            category: "APIs & Data",
            items: ["WordPress REST API", "Courier Integration Interface", "Wilaya JSON Pricing Matrix"],
            note: "Asynchronous order dispatch with client-side form validation.",
          },
          {
            category: "Tracking & Pixels",
            items: ["Meta Conversions / Pixel", "TikTok Pixel Integration", "Google Tracking Tag"],
            note: "Deduplicated order confirmation event triggers.",
          },
        ],
        decisions: [
          {
            title: "Custom Plugin Architecture vs. Generic Plugins",
            reason:
              "Off-the-shelf checkout plugins introduce heavy database queries and bloated JavaScript. Writing a custom plugin kept the database footprint minimal, allowed exact COD status lifecycles, and prevented update conflicts.",
          },
          {
            title: "Decoupled Shipping Gateway Abstraction",
            reason:
              "Created a modular adapter interface designed so delivery courier APIs can be plugged in without refactoring core order management logic.",
          },
          {
            title: "Client-Side Wilaya Calculation with Server Verification",
            reason:
              "Instant dynamic delivery cost updates occur immediately as the user picks their wilaya on mobile, then verified securely on the server prior to order commitment.",
          },
        ],
      },
      keyFeatures: [
        {
          title: "Single-Step COD Checkout Form",
          description:
            "Streamlined ordering form directly on the product landing page with real-time wilaya selection and automatic delivery fee calculation.",
          status: "Completed",
        },
        {
          title: "Centralized Order Management Dashboard",
          description:
            "Custom administrative table to manage orders, customer contact info, delivery addresses, and payment confirmation statuses.",
          status: "Completed",
        },
        {
          title: "58-Wilaya National Tariff Matrix",
          description:
            "Structured administrative pricing engine supporting distinct home-delivery and stop-desk delivery fees for every Algerian wilaya.",
          status: "Completed",
        },
        {
          title: "Multi-Platform Pixel Tracking",
          description:
            "Native tracking integration with Meta Pixel, TikTok Pixel, and Google Tracking tags firing verified purchase events.",
          status: "Completed",
        },
        {
          title: "Scalable Multi-Carrier Gateway",
          description:
            "Architectural integration gateway designed with modular adapters to scale toward 80+ courier providers across Algeria as operations expand.",
          status: "Architectural Target",
        },
        {
          title: "Order Lifecycle & Return Status Tracking",
          description:
            "Status management for shipments transitioning between Pending, Confirmed, Shipped, Delivered, and Returned.",
          status: "Completed",
        },
      ],
      developmentProcess: [
        {
          step: "01",
          title: "Workflow Discovery & Local Market Mapping",
          description:
            "Analyzed Algerian customer ordering behaviors on mobile devices and mapped out the exact operational flow required by merchants: from social media ad click to call confirmation and delivery dispatch.",
        },
        {
          step: "02",
          title: "Custom Plugin Architecture & Data Modeling",
          description:
            "Architected a custom WordPress plugin to register custom post types and lightweight database tables, avoiding the database overhead of full multi-vendor eCommerce suites.",
        },
        {
          step: "03",
          title: "Shipping Matrix & Form Engineering",
          description:
            "Developed the hierarchical 58-wilaya data structure and wired client-side selection with dynamic pricing recalculation, ensuring zero page reload latency for shoppers.",
        },
        {
          step: "04",
          title: "Dashboard Construction & Courier Adapter Layer",
          description:
            "Constructed the administrative orders panel with status toggles, courier assignment hooks, and designed the extensible adapter pattern for future carrier integrations.",
        },
        {
          step: "05",
          title: "Tracking Synchronization & Performance Hardening",
          description:
            "Wired Meta and TikTok conversion events, audited asset delivery for fast performance on real 4G networks, and verified order submissions end-to-end.",
        },
      ],
      showcase: {
        title: "System Interface & Workflow Showcase",
        description:
          "Real visual captures demonstrating the unified operations dashboard, shipping pricing configuration, and mobile-optimized customer landing page.",
        items: [
          {
            url: "/projects/darna.webp",
            caption:
              "The complete ecosystem: Centralized administrative tablet dashboard with metrics and orders table, paired with mobile 58-wilaya shipping management and landing page.",
            tag: "Complete Ecosystem Overview",
          },
        ],
      },
      nextProject: {
        slug: "lumen-store",
        title: "Lumen Store",
        category: "eCommerce",
      },
    },
  },
  ar: {
    darna: {
      slug: "darna",
      projectSlug: "darna",
      title: "DARNA",
      subtitle: "صفحة هبوط مخصصة للتحويل ونظام إدارة لوجستيات التجارة الإلكترونية الجزائرية",
      category: "نظام إدارة التجارة الإلكترونية",
      year: "2026",
      role: "تطوير شامل وهندسة برمجية (Full-Stack Architecture)",
      timeline: "مكتمل وجاهز للإنتاج",
      heroImage: "/projects/darna.webp",
      liveUrl: "https://darna.wldelroudjishoes.com",
      overview: {
        summary:
          "مشروع DARNA هو حل تقني متكامل للتجارة الإلكترونية مصمم خصيصاً لخصوصيات السوق الجزائري. يجمع بين صفحة هبوط سريعة وموجهة للهواتف لتحقيق أعلى معدل تحويل، ولوحة تحكم مخصصة مبنية على WordPress تجمع إدارة طلبات الدفع عند الاستلام (COD)، وأسعار التوصيل عبر 58 ولاية، وعمليات الشحن، وتتبع الحملات الإعلانية.",
        purpose:
          "تمكين أصحاب المتاجر الجزائرية من تجربة طلب فورية ومبسطة للزبائن تمنع هجر سلة الشراء، مع توفير مركز تحكم مركزي لإدارة الطلبيات وتأكيد المكالمات وحساب تكاليف الشحن تلقائياً.",
        targetAudience:
          "أصحاب مشاريع التجارة الإلكترونية في الجزائر الذين يعتمدون على إعلانات السوشيال ميديا ويديرون مبيعات الدفع عند الاستلام عبر مختلف الولايات.",
        specs: [
          { label: "البنية البرمجية", value: "إضافة وقالب مخصص لـ WordPress" },
          { label: "الواجهة الأمامية", value: "JavaScript · Tailwind CSS" },
          { label: "الواجهة الخلفية", value: "PHP · REST API" },
          { label: "النطاق اللوجستي", value: "58 ولاية جزائرية (المنزل والمكتب)" },
        ],
      },
      challenge: {
        title: "التحديات الواقعية للتجارة الإلكترونية في الجزائر",
        context:
          "تتميز السوق الجزائرية بمتطلبات تشغيلية خاصة تجعل المنصات العالمية الجاهزة غير متوافقة بشكل كامل مع الواقع الميداني.",
        points: [
          {
            title: "هيمنة الدفع عند الاستلام (Cash on Delivery)",
            description:
              "يعتمد المشترون عبر الإنترنت في الجزائر بشكل كلي على الدفع عند الاستلام. تدفقات الشراء التقليدية متعددة الخطوات التي تتطلب إنشاء حساب وسلة شراء تسبب انسحاب الزبائن على شبكات الهاتف المحمول.",
          },
          {
            title: "تباين أسعار الشحن عبر 58 ولاية",
            description:
              "تختلف كلفة التوصيل بشكل كبير بين التوصيل إلى باب المنزل (à domicile) والاستلام من المكتب (Stop-Desk) بحسب كل ولاية وبلدية، مما يتطلب نظام تسعير ديناميكي ودقيق لتجنب خسائر الشحن.",
          },
          {
            title: "تعدد شركات التوصيل وتشتتها",
            description:
              "يضطر التاجر إلى التعامل مع شركات توصيل متعددة لتغطية كافة المناطق، مما استدعى تصميماً معمارياً يعزل آلية الطلبات عن واجهات الشركات المنفردة لسهولة الربط.",
          },
          {
            title: "فجوات تتبع الحملات الإعلانية في دورة الـ COD",
            description:
              "ضرورة ربط بكسلات إعلانات Meta وTikTok وGoogle بلحظة إرسال الطلب الموثوقة لمنع تكرار الإرسال وتأكيد دقة تتبع عائد الاستثمار الإعلاني.",
          },
        ],
      },
      solution: {
        title: "بنية برمجية مخصصة لتحقيق أعلى سرعة واستقرار تشغيلي",
        summary:
          "بدلاً من تثبيت عشرات الإضافات الجاهزة التي تبطئ سرعة تحميل الموقع، تم تطوير DARNA كبنية برمجية مخصصة تفصل تجربة الشراء للعميل عن لوحة إدارة العمليات الداخلية.",
        pillars: [
          {
            tag: "تجربة الشراء",
            title: "نموذج طلب مباشر وسريع بضغطة واحدة",
            description:
              "استبدال سلة الشراء التقليدية باستمارة سريعة في نفس الصفحة، تسمح باختيار خيارات المنتج، الولاية، والبلدية مع تحديث سعر التوصيل فوراً بدون إعادة تحميل الصفحة.",
          },
          {
            tag: "إدارة العمليات",
            title: "لوحة تحكم إدارية مخصصة",
            description:
              "واجهة مخصصة داخل لوحة التحكم تمكن التاجر وفريقه من مراجعة الطلبات الواردة، تتبع حالات الاتصال والتأكيد، وإدارة حالات الشحن بكفاءة.",
          },
          {
            tag: "هندسة البيانات",
            title: "مصفوفة أسعار لـ 58 ولاية جزائرية",
            description:
              "هيكلة بيانات جغرافية منظمة تتضمن تسعير التوصيل للمنزل والمكتب لكل ولاية، مما يضمن حساباً آلياً دقيقاً لتكلفة الشحن.",
          },
          {
            tag: "التتبع الإعلاني",
            title: "مزامنة بكسلات التتبع التسويقي",
            description:
              "تكامل برمجي مع Meta Pixel وTikTok Pixel وGoogle Tracking لإطلاق أحداث الشراء والعملاء المحتملين فور التحقق من صحة الطلب.",
          },
        ],
      },
      architecture: {
        title: "البنية المعمارية والقرارات التقنية",
        description:
          "يركز النهج المعماري على الأداء الفائق، أمان تدفق الطلبات، وقابلية التوسع دون الاعتماد على مكتبات غير ضرورية.",
        techStack: [
          {
            category: "المنصة الأساسية",
            items: ["WordPress مخصص", "بنية PHP 8.x الحديثة", "إضافة مخصصة بدون أدوات بناء صفحات ثقيلة"],
            note: "كود برمجي خفيف يضمن أعلى سرعة استجابة على السيرفر.",
          },
          {
            category: "واجهة المستخدم",
            items: ["Tailwind CSS", "JavaScript الحديث بدون أطر ثقيلة", "تصميم متوافق مع كافة الهواتف"],
            note: "محسّن لشبكات الجيل الرابع 4G في الجزائر بحجم ملفات مصغر جداً.",
          },
          {
            category: "البيانات والـ APIs",
            items: ["WordPress REST API", "طبقة ربط شركات الشحن", "ملف مصفوفة أسعار الولايات JSON"],
            note: "إرسال غير متزامن للطلبات مع فحص فوري للبيانات.",
          },
          {
            category: "أدوات التتبع الإعلاني",
            items: ["Meta Pixel / Conversions", "TikTok Pixel Integration", "Google Tracking Tag"],
            note: "معالجة لمنع تكرار تسجيل الطلب عند تحديث الصفحة.",
          },
        ],
        decisions: [
          {
            title: "بناء إضافة مخصصة بدلاً من الإضافات الجاهزة",
            reason:
              "تتسبب إضافات الشراء الجاهزة في إبطاء قاعدة البيانات واستدعاء مكتبات ثقيلة. بناء إضافة خاصة حافظ على نظافة قاعدة البيانات وأتاح ضبط مسار الدفع عند الاستلام بدقة.",
          },
          {
            title: "تصميم بنية مرنة لشركات التوصيل (Adapter Pattern)",
            reason:
              "إنشاء طبقة وسيطة تتيح ربط واجهات برمجة تطبيقات شركات الشحن المتعددة دون الحاجة لإعادة كتابة منطق إدارة الطلبيات.",
          },
          {
            title: "حساب تسعيرة الشحن فورياً على جهاز المستخدم مع التحقق من السيرفر",
            reason:
              "إظهار تكلفة الشحن فور اختيار الولاية دون أي تأخير، والتحقق النهائي على الخادم لمنع أي تلاعب بالأسعار.",
          },
        ],
      },
      keyFeatures: [
        {
          title: "استمارة طلب COD بضغطة زر واحدة",
          description:
            "استمارة مبسطة ومباشرة على صفحة المنتج مع اختيار سلس للولايات وحساب فوري لتكلفة التوصيل.",
          status: "Completed",
        },
        {
          title: "لوحة تحكم مركزية لإدارة الطلبات",
          description:
            "جدول متقدم لمعاينة الطلبات الواردة، بيانات الزبائن، حالات الاتصال والتأكيد وتتبع التوصيل.",
          status: "Completed",
        },
        {
          title: "نظام تسعير شحن 58 ولاية جزائرية",
          description:
            "محرك تسعير يتيح تحديد أسعار مختلفة للتوصيل إلى المنزل أو استلام المكتب لكل ولاية على حدة.",
          status: "Completed",
        },
        {
          title: "تتبع الحملات الإعلانية متعدد المنصات",
          description:
            "ربط مدمج مع بكسل فيسبوك/إنستغرام، تيك توك، وجوجل لتسجيل أحداث الشراء وتفادي التكرار.",
          status: "Completed",
        },
        {
          title: "بنية ربط قابلة للتوسع مع شركات التوصيل",
          description:
            "هندسة برمجية مهيأة للربط مع ما يصل إلى 80+ شركة توصيل عبر ولايات الجزائر عند توسيع العمليات.",
          status: "Architectural Target",
        },
        {
          title: "إدارة دورة حياة الطلب والمردودات",
          description:
            "متابعة دقيقة لمراحل الطلب: قيد المعالجة، مؤكد، تم الشحن، تم التسليم، أو راجع (مردود).",
          status: "Completed",
        },
      ],
      developmentProcess: [
        {
          step: "01",
          title: "فهم سلوك المشتري الجزائري وتدفق العمليات",
          description:
            "تحليل تجربة المستخدم على الهواتف المحمولة وتحديد الخطوات الأساسية التي يحتاجها التاجر: من النقرة على الإعلان وحتى تسليم الطرد واستلام المبلغ.",
        },
        {
          step: "02",
          title: "تطوير الإضافة المخصصة ونمذجة البيانات",
          description:
            "برمجة إضافة WordPress خاصة لإنشاء جداول مخصصة لحفظ الطلبات بسرعة، متجنبةً استعلامات قواعد البيانات الثقيلة.",
        },
        {
          step: "03",
          title: "بناء مصفوفة أسعار الولايات واستمارة الطلب",
          description:
            "هيكلة بيانات 58 ولاية جزائرية وربطها بالواجهة لتحديث أسعار التوصيل بشكل تفاعلي فوري دون أي بطء.",
        },
        {
          step: "04",
          title: "بناء لوحة إدارة الطلبات وطبقة شركات الشحن",
          description:
            "تطوير جدول الإدارة الداخلي مع أزرار تبديل الحالات، وهندسة واجهة برمجية موحدة لربط شركات الشحن مستقبلاً.",
        },
        {
          step: "05",
          title: "ضبط التتبع التسويقي واختبار الأداء النهائي",
          description:
            "اختبار إطلاق بكسلات ميتا وتيك توك، فحص سرعة الاستجابة على هواتف وشبكات 4G، والتأكد من استقرار تدفق الطلبات.",
        },
      ],
      showcase: {
        title: "معاينة واجهات النظام وتدفق العمليات",
        description:
          "لقطات حقيقية توضح لوحة التحكم المركزية، جدول إدارة الشحن لـ 58 ولاية، واستمارة الطلب السريعة للهواتف.",
        items: [
          {
            url: "/projects/darna.webp",
            caption:
              "النظام المتكامل: لوحة تحكم مركزية على جهاز لوحي لإدارة الطلبيات والمؤشرات، مع شاشة إدارة أسعار الولايات وصفحة الطلب على الهاتف.",
            tag: "نظرة شاملة على النظام",
          },
        ],
      },
      nextProject: {
        slug: "lumen-store",
        title: "متجر Lumen للأزياء",
        category: "تجارة إلكترونية",
      },
    },
  },
};

export function getCaseStudy(slug: string, language: "en" | "ar" = "en"): CaseStudyData | null {
  return caseStudies[language]?.[slug] || caseStudies.en?.[slug] || null;
}

export function getAllCaseStudySlugs(): string[] {
  return Object.keys(caseStudies.en);
}
