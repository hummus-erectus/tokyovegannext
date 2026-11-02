/**
 * Sources behind the figures in the "Why go vegan?" cards (messages: AboutVeganPage.whyGoVegan.sections).
 * Listed in the order the claims appear. If you change a figure in the copy, update its source here.
 */
export type Source = {
  label: string;
  url: string;
};

export type ReasonKey = "animals" | "planet" | "health" | "publicHealth" | "humanRights";

export const reasonSources: Record<ReasonKey, Source[]> = {
  animals: [
    {
      label: "Our World in Data / FAOSTAT — Land animals slaughtered for meat",
      url: "https://ourworldindata.org/grapher/land-animals-slaughtered-for-meat",
    },
    {
      label: "fishcount.org.uk — Estimated numbers of wild fish caught each year",
      url: "https://fishcount.org.uk/",
    },
    {
      label: "Bar-On, Phillips & Milo (2018). The biomass distribution on Earth. PNAS",
      url: "https://doi.org/10.1073/pnas.1711842115",
    },
    {
      label: "EFSA Panel on Animal Health and Welfare (2023). Welfare of broilers on farm. EFSA Journal",
      url: "https://doi.org/10.2903/j.efsa.2023.7788",
    },
  ],
  planet: [
    {
      label: "FAO (2013). Tackling Climate Change through Livestock",
      url: "https://www.fao.org/3/i3437e/i3437e.pdf",
    },
    {
      label: "IPCC (2014). Fifth Assessment Report, Working Group III: Mitigation of Climate Change",
      url: "https://www.ipcc.ch/report/ar5/wg3/",
    },
    {
      label: "Mekonnen & Hoekstra (2012). A global assessment of the water footprint of farm animal products. Ecosystems",
      url: "https://doi.org/10.1007/s10021-011-9517-8",
    },
    {
      label: "Poore & Nemecek (2018). Reducing food's environmental impacts through producers and consumers. Science",
      url: "https://doi.org/10.1126/science.aaq0216",
    },
    {
      label: "Benton et al. (2021). Food system impacts on biodiversity loss. Chatham House / UNEP",
      url: "https://www.chathamhouse.org/2021/02/food-system-impacts-biodiversity-loss",
    },
  ],
  health: [
    {
      label: "WHO — The top 10 causes of death",
      url: "https://www.who.int/news-room/fact-sheets/detail/the-top-10-causes-of-death",
    },
    {
      label: "Melina, Craig & Levin (2016). Position of the Academy of Nutrition and Dietetics: Vegetarian Diets",
      url: "https://doi.org/10.1016/j.jand.2016.09.025",
    },
    {
      label: "British Dietetic Association — Plant-based diet food fact sheet",
      url: "https://www.bda.uk.com/resource/vegetarian-vegan-plant-based-diet.html",
    },
    {
      label: "Yokoyama et al. (2017). Association between plant-based diets and plasma lipids. Nutrition Reviews",
      url: "https://doi.org/10.1093/nutrit/nux030",
    },
    {
      label: "Tonstad et al. (2009). Type of vegetarian diet, body weight, and prevalence of type 2 diabetes. Diabetes Care",
      url: "https://doi.org/10.2337/dc08-1886",
    },
  ],
  publicHealth: [
    {
      label: "Jones et al. (2008). Global trends in emerging infectious diseases. Nature",
      url: "https://doi.org/10.1038/nature06536",
    },
    {
      label: "UNEP & ILRI (2020). Preventing the next pandemic: Zoonotic diseases and how to break the chain of transmission",
      url: "https://www.unep.org/resources/report/preventing-future-zoonotic-disease-outbreaks-protecting-environment-animals-and",
    },
    {
      label: "WHO — Food safety fact sheet",
      url: "https://www.who.int/news-room/fact-sheets/detail/food-safety",
    },
    {
      label: "WHO — Campylobacter fact sheet",
      url: "https://www.who.int/news-room/fact-sheets/detail/campylobacter",
    },
    {
      label: "Van Boeckel et al. (2019). Global trends in antimicrobial resistance in animals in low- and middle-income countries. Science",
      url: "https://doi.org/10.1126/science.aaw1944",
    },
  ],
  humanRights: [
    {
      label: "FAO, IFAD, UNICEF, WFP & WHO (2025). The State of Food Security and Nutrition in the World 2025",
      url: "https://www.fao.org/newsroom/detail/sofi-2025--fao-calls-for-urgent--coordinated-and-inclusive-action-to-end-global-hunger/en",
    },
    {
      label: "Cassidy et al. (2013). Redefining agricultural yields: from tonnes to people nourished per hectare. Environmental Research Letters",
      url: "https://doi.org/10.1088/1748-9326/8/3/034015",
    },
    {
      label: "Poore & Nemecek (2018). Reducing food's environmental impacts through producers and consumers. Science",
      url: "https://doi.org/10.1126/science.aaq0216",
    },
  ],
};
