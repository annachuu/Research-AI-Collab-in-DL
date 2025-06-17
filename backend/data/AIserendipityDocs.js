const AIData =  [

    {
        "pnx": {
            "links": {
                "openurlfulltext": [
                    "$$Topenurlfull_article"
                ],
                "openurl": [
                    "$$Topenurl_article"
                ],
                "backlink": [
                    "$$Uhttps://www.ncbi.nlm.nih.gov/pubmed/33856478$$D View this record in MEDLINE/PubMed$$Hfree_for_read"
                ],
                "thumbnail": [
                    "$$Tsyndetics_thumb_exl"
                ]
            },
            "search": {
                "description": [
                    "The lack of standards in methods to reduce bias for clinical algorithms presents various challenges in providing reliable predictions and in addressing health disparities.\nTo evaluate approaches for reducing bias in machine learning models using a real-world clinical scenario.\nHealth data for this cohort study were obtained from the IBM MarketScan Medicaid Database. Eligibility criteria were as follows: (1) Female individuals aged 12 to 55 years with a live birth record identified by delivery-related codes from January 1, 2014, through December 31, 2018; (2) greater than 80% enrollment through pregnancy to 60 days post partum; and (3) evidence of coverage for depression screening and mental health services. Statistical analysis was performed in 2020.\nBinarized race (Black individuals and White individuals).\nMachine learning models (logistic regression [LR], random forest, and extreme gradient boosting) were trained for 2 binary outcomes: postpartum depression (PPD) and postpartum mental health service utilization. Risk-adjusted generalized linear models were used for each outcome to assess potential disparity in the cohort associated with binarized race (Black or White). Methods for reducing bias, including reweighing, Prejudice Remover, and removing race from the models, were examined by analyzing changes in fairness metrics compared with the base models. Baseline characteristics of female individuals at the top-predicted risk decile were compared for systematic differences. Fairness metrics of disparate impact (DI, 1 indicates fairness) and equal opportunity difference (EOD, 0 indicates fairness).\nAmong 573 634 female individuals initially examined for this study, 314 903 were White (54.9%), 217 899 were Black (38.0%), and the mean (SD) age was 26.1 (5.5) years. The risk-adjusted odds ratio comparing White participants with Black participants was 2.06 (95% CI, 2.02-2.10) for clinically recognized PPD and 1.37 (95% CI, 1.33-1.40) for postpartum mental health service utilization. Taking the LR model for PPD prediction as an example, reweighing reduced bias as measured by improved DI and EOD metrics from 0.31 and -0.19 to 0.79 and 0.02, respectively. Removing race from the models had inferior performance for reducing bias compared with the other methods (PPD: DI = 0.61; EOD = -0.05; mental health service utilization: DI = 0.63; EOD = -0.04).\nClinical prediction models trained on potentially biased data may produce unfair outcomes on the basis of the chosen metrics. This study's results suggest that the performance varied depending on the model, outcome label, and method for reducing bias. This approach toward evaluating algorithmic bias can be used as an example for the growing number of researchers who wish to examine and address bias in their data and models."
                ],
                "creator": [
                    "Park, Yoonyoung",
                    "Hu, Jianying",
                    "Singh, Moninder",
                    "Sylla, Issa",
                    "Dankwa-Mullan, Irene",
                    "Koski, Eileen",
                    "Das, Amar K"
                ],
                "title": [
                    "Comparison of Methods to Reduce Bias From Clinical Prediction Models of Postpartum Depression",
                    "JAMA network open"
                ],
                "subject": [
                    "Bias",
                    "Depression, Mental",
                    "Machine learning",
                    "Medical care",
                    "Medical informatics",
                    "Medical screening",
                    "Mental health",
                    "Postpartum depression",
                    "Public health",
                    "Research"
                ],
                "issn": [
                    "2574-3805",
                    "2574-3805"
                ],
                "fulltext": [
                    "true"
                ],
                "addtitle": [
                    "JAMA Netw Open"
                ],
                "general": [
                    "American Medical Association"
                ],
                "startdate": [
                    "20210401"
                ],
                "enddate": [
                    "20210401"
                ],
                "recordtype": [
                    "article"
                ],
                "recordid": [
                    "eNpdkV9PFTEQxRsjEQJ8BVPjiy_3Ov2z2-6LiV5FSSASo4-mKe2s9Lq7XduuhG9Pb0CCPM0kc87JzPwIecVgzQDY260d7YTlOqbfccZpzYGzteige0YOeKPkSmhonj_q98lxzlsA4MBE1zYvyL4Qumml0gfk5yaOs00hx4nGnp5juYo-0xLpN_SLQ_oh2ExPUhzpZghTcHagFwl9cCVUy3n0OOSd8yLmUoPKMtKPOCfMuc6PyF5vh4zH9_WQ_Dj59H3zZXX29fPp5v3ZykoFZaU7LlvOWy9Aub4u3liFTmvWtwiyF8opryx4eQkehbIeJGM9ai2FVUqiOCTv7nLn5XJE73AqyQ5mTmG06cZEG8z_kylcmV_xr6nvASV5DXhzH5DinwVzMWPIDoehvjou2fCGCS4bKWSVvn4i3cYlTfU8w9tWadl1ilVVd6dyKeacsH9YhoHZcTRPOJodR7PjWL0vH1_z4PxHTdwCTJ6fMw"
                ],
                "scope": [
                    "NPM",
                    "AAYXX",
                    "CITATION",
                    "3V.",
                    "7X7",
                    "7XB",
                    "8FI",
                    "8FJ",
                    "8FK",
                    "ABUWG",
                    "AFKRA",
                    "AZQEC",
                    "BENPR",
                    "CCPQU",
                    "DWQXO",
                    "FYUFA",
                    "GHDGH",
                    "K9.",
                    "M0S",
                    "PHGZM",
                    "PHGZT",
                    "PIMPY",
                    "PKEHL",
                    "PQEST",
                    "PQQKQ",
                    "PQUKI",
                    "PRINS",
                    "7X8",
                    "5PM"
                ],
                "creationdate": [
                    "2021"
                ],
                "creatorcontrib": [
                    "Park, Yoonyoung",
                    "Hu, Jianying",
                    "Singh, Moninder",
                    "Sylla, Issa",
                    "Dankwa-Mullan, Irene",
                    "Koski, Eileen",
                    "Das, Amar K"
                ],
                "rsrctype": [
                    "article"
                ]
            },
            "delivery": {
                "fulltext": [
                    "fulltext"
                ],
                "delcategory": [
                    "Remote Search Resource"
                ]
            },
            "display": {
                "description": [
                    "The lack of standards in methods to reduce bias for clinical algorithms presents various challenges in providing reliable predictions and in addressing health disparities.\nTo evaluate approaches for reducing bias in machine learning models using a real-world clinical scenario.\nHealth data for this cohort study were obtained from the IBM MarketScan Medicaid Database. Eligibility criteria were as follows: (1) Female individuals aged 12 to 55 years with a live birth record identified by delivery-related codes from January 1, 2014, through December 31, 2018; (2) greater than 80% enrollment through pregnancy to 60 days post partum; and (3) evidence of coverage for depression screening and mental health services. Statistical analysis was performed in 2020.\nBinarized race (Black individuals and White individuals).\nMachine learning models (logistic regression [LR], random forest, and extreme gradient boosting) were trained for 2 binary outcomes: postpartum depression (PPD) and postpartum mental health service utilization. Risk-adjusted generalized linear models were used for each outcome to assess potential disparity in the cohort associated with binarized race (Black or White). Methods for reducing bias, including reweighing, Prejudice Remover, and removing race from the models, were examined by analyzing changes in fairness metrics compared with the base models. Baseline characteristics of female individuals at the top-predicted risk decile were compared for systematic differences. Fairness metrics of disparate impact (DI, 1 indicates fairness) and equal opportunity difference (EOD, 0 indicates fairness).\nAmong 573 634 female individuals initially examined for this study, 314 903 were White (54.9%), 217 899 were Black (38.0%), and the mean (SD) age was 26.1 (5.5) years. The risk-adjusted odds ratio comparing White participants with Black participants was 2.06 (95% CI, 2.02-2.10) for clinically recognized PPD and 1.37 (95% CI, 1.33-1.40) for postpartum mental health service utilization. Taking the LR model for PPD prediction as an example, reweighing reduced bias as measured by improved DI and EOD metrics from 0.31 and -0.19 to 0.79 and 0.02, respectively. Removing race from the models had inferior performance for reducing bias compared with the other methods (PPD: DI = 0.61; EOD = -0.05; mental health service utilization: DI = 0.63; EOD = -0.04).\nClinical prediction models trained on potentially biased data may produce unfair outcomes on the basis of the chosen metrics. This study's results suggest that the performance varied depending on the model, outcome label, and method for reducing bias. This approach toward evaluating algorithmic bias can be used as an example for the growing number of researchers who wish to examine and address bias in their data and models."
                ],
                "publisher": [
                    "United States: American Medical Association"
                ],
                "ispartof": [
                    "JAMA network open, 2021-04, Vol.4 (4), p.e213909-e213909"
                ],
                "identifier": [
                    "ISSN: 2574-3805",
                    "EISSN: 2574-3805",
                    "DOI: 10.1001/jamanetworkopen.2021.3909",
                    "PMID: 33856478"
                ],
                "rights": [
                    "2021. This work is published under https://creativecommons.org/licenses/by-nc-nd/4.0/ (the “License”). Notwithstanding the ProQuest Terms and Conditions, you may use this content in accordance with the terms of the License.",
                    "Copyright 2021 Park Y et al. ."
                ],
                "snippet": [
                    "....\nTo evaluate approaches for reducing bias in machine learning models using a real-world clinical scenario...",
                    ".... Objective To evaluate approaches for reducing bias in machine learning models using a real-world clinical scenario...",
                    ".... ObjectiveTo evaluate approaches for reducing bias in machine learning models using a real-world clinical scenario...",
                    "This cohort study evaluates approaches for reducing bias in machine learning models to\npredict postpartum depression using data from Black and White pregnant..."
                ],
                "creator": [
                    "Park, Yoonyoung ; Hu, Jianying ; Singh, Moninder ; Sylla, Issa ; Dankwa-Mullan, Irene ; Koski, Eileen ; Das, Amar K"
                ],
                "title": [
                    "Comparison of Methods to Reduce Bias From Clinical Prediction Models of Postpartum Depression"
                ],
                "lds50": [
                    "peer_reviewed"
                ],
                "type": [
                    "article"
                ],
                "source": [
                    "DOAJ Open Access Full Text",
                    "AMA Current Titles",
                    "EZB-FREE-00999 freely available EZB journals",
                    "Alma/SFX Local Collection"
                ],
                "language": [
                    "eng"
                ],
                "oa": [
                    "free_for_read"
                ],
                "subject": [
                    "Bias ;  Depression, Mental ;  Machine learning ;  Medical care ;  Medical informatics ;  Medical screening ;  Mental health ;  Postpartum depression ;  Public health ;  Research"
                ],
                "keyword": [
                    "Generalized linear models ;  Index Medicus ;  Online Only ;  Original Investigation"
                ]
            },
            "facets": {
                "creationdate": [
                    "2021"
                ],
                "creatorcontrib": [
                    "Park, Yoonyoung",
                    "Hu, Jianying",
                    "Singh, Moninder",
                    "Sylla, Issa",
                    "Dankwa-Mullan, Irene",
                    "Koski, Eileen",
                    "Das, Amar K"
                ],
                "language": [
                    "eng"
                ],
                "toplevel": [
                    "peer_reviewed",
                    "online_resources"
                ],
                "frbrgroupid": [
                    "cdi_FETCH-LOGICAL-a470t-89246226d307cf2575a7ec881f6e04f37c7d7a0d4b0de37ad0411fe8843a774e3"
                ],
                "frbrtype": [
                    "5"
                ],
                "jtitle": [
                    "JAMA network open"
                ],
                "topic": [
                    "Bias",
                    "Depression, Mental",
                    "Machine learning",
                    "Medical care",
                    "Medical informatics",
                    "Medical screening",
                    "Mental health",
                    "Postpartum depression",
                    "Public health",
                    "Research"
                ],
                "prefilter": [
                    "articles"
                ],
                "rsrctype": [
                    "articles"
                ],
                "collection": [
                    "PubMed",
                    "CrossRef",
                    "ProQuest Central (Corporate)",
                    "Health & Medical Collection",
                    "ProQuest Central (purchase pre-March 2016)",
                    "ProQuest Hospital Collection",
                    "Hospital Premium Collection (Alumni Edition)",
                    "ProQuest Central (Alumni) (purchase pre-March 2016)",
                    "ProQuest Central",
                    "ProQuest Central UK/Ireland",
                    "ProQuest Central Essentials",
                    "ProQuest Central",
                    "ProQuest One Community College",
                    "ProQuest Central",
                    "Health Research Premium Collection",
                    "Health Research Premium Collection (Alumni)",
                    "ProQuest Health & Medical Complete (Alumni)",
                    "Health & Medical Collection (Alumni)",
                    "ProQuest Central (New)",
                    "ProQuest One Academic (New)",
                    "Publicly Available Content Database",
                    "ProQuest One Academic Middle East (New)",
                    "ProQuest One Academic Eastern Edition (DO NOT USE)",
                    "ProQuest One Academic",
                    "ProQuest One Academic UKI Edition",
                    "ProQuest Central China",
                    "MEDLINE - Academic",
                    "PubMed Central (Full Participant titles)"
                ]
            },
            "addata": {
                "format": [
                    "journal"
                ],
                "ristype": [
                    "JOUR"
                ],
                "cop": [
                    "United States"
                ],
                "pub": [
                    "American Medical Association"
                ],
                "doi": [
                    "10.1001/jamanetworkopen.2021.3909"
                ],
                "pmid": [
                    "33856478"
                ],
                "au": [
                    "Park, Yoonyoung",
                    "Hu, Jianying",
                    "Singh, Moninder",
                    "Sylla, Issa",
                    "Dankwa-Mullan, Irene",
                    "Koski, Eileen",
                    "Das, Amar K"
                ],
                "atitle": [
                    "Comparison of Methods to Reduce Bias From Clinical Prediction Models of Postpartum Depression"
                ],
                "date": [
                    "2021-04-01"
                ],
                "risdate": [
                    "2021"
                ],
                "volume": [
                    "4"
                ],
                "issue": [
                    "4"
                ],
                "spage": [
                    "e213909"
                ],
                "epage": [
                    "e213909"
                ],
                "pages": [
                    "e213909-e213909"
                ],
                "eissn": [
                    "2574-3805"
                ],
                "issn": [
                    "2574-3805"
                ],
                "addtitle": [
                    "JAMA Netw Open"
                ],
                "abstract": [
                    "The lack of standards in methods to reduce bias for clinical algorithms presents various challenges in providing reliable predictions and in addressing health disparities.\nTo evaluate approaches for reducing bias in machine learning models using a real-world clinical scenario.\nHealth data for this cohort study were obtained from the IBM MarketScan Medicaid Database. Eligibility criteria were as follows: (1) Female individuals aged 12 to 55 years with a live birth record identified by delivery-related codes from January 1, 2014, through December 31, 2018; (2) greater than 80% enrollment through pregnancy to 60 days post partum; and (3) evidence of coverage for depression screening and mental health services. Statistical analysis was performed in 2020.\nBinarized race (Black individuals and White individuals).\nMachine learning models (logistic regression [LR], random forest, and extreme gradient boosting) were trained for 2 binary outcomes: postpartum depression (PPD) and postpartum mental health service utilization. Risk-adjusted generalized linear models were used for each outcome to assess potential disparity in the cohort associated with binarized race (Black or White). Methods for reducing bias, including reweighing, Prejudice Remover, and removing race from the models, were examined by analyzing changes in fairness metrics compared with the base models. Baseline characteristics of female individuals at the top-predicted risk decile were compared for systematic differences. Fairness metrics of disparate impact (DI, 1 indicates fairness) and equal opportunity difference (EOD, 0 indicates fairness).\nAmong 573 634 female individuals initially examined for this study, 314 903 were White (54.9%), 217 899 were Black (38.0%), and the mean (SD) age was 26.1 (5.5) years. The risk-adjusted odds ratio comparing White participants with Black participants was 2.06 (95% CI, 2.02-2.10) for clinically recognized PPD and 1.37 (95% CI, 1.33-1.40) for postpartum mental health service utilization. Taking the LR model for PPD prediction as an example, reweighing reduced bias as measured by improved DI and EOD metrics from 0.31 and -0.19 to 0.79 and 0.02, respectively. Removing race from the models had inferior performance for reducing bias compared with the other methods (PPD: DI = 0.61; EOD = -0.05; mental health service utilization: DI = 0.63; EOD = -0.04).\nClinical prediction models trained on potentially biased data may produce unfair outcomes on the basis of the chosen metrics. This study's results suggest that the performance varied depending on the model, outcome label, and method for reducing bias. This approach toward evaluating algorithmic bias can be used as an example for the growing number of researchers who wish to examine and address bias in their data and models."
                ],
                "jtitle": [
                    "JAMA network open"
                ],
                "genre": [
                    "article"
                ],
                "oa": [
                    "free_for_read"
                ]
            },
            "sort": {
                "title": [
                    "Comparison of Methods to Reduce Bias From Clinical Prediction Models of Postpartum Depression"
                ],
                "creationdate": [
                    "20210401"
                ],
                "author": [
                    "Park, Yoonyoung ; Hu, Jianying ; Singh, Moninder ; Sylla, Issa ; Dankwa-Mullan, Irene ; Koski, Eileen ; Das, Amar K"
                ]
            },
            "control": {
                "iscdi": [
                    "true"
                ],
                "recordtype": [
                    "article"
                ],
                "sourceid": [
                    "proquest_pubme"
                ],
                "recordid": [
                    "cdi_pubmedcentral_primary_oai_pubmedcentral_nih_gov_8050742"
                ],
                "addsrcrecordid": [
                    "eNpdkV9PFTEQxRsjEQJ8BVPjiy_3Ov2z2-6LiV5FSSASo4-mKe2s9Lq7XduuhG9Pb0CCPM0kc87JzPwIecVgzQDY260d7YTlOqbfccZpzYGzteige0YOeKPkSmhonj_q98lxzlsA4MBE1zYvyL4Qumml0gfk5yaOs00hx4nGnp5juYo-0xLpN_SLQ_oh2ExPUhzpZghTcHagFwl9cCVUy3n0OOSd8yLmUoPKMtKPOCfMuc6PyF5vh4zH9_WQ_Dj59H3zZXX29fPp5v3ZykoFZaU7LlvOWy9Aub4u3liFTmvWtwiyF8opryx4eQkehbIeJGM9ai2FVUqiOCTv7nLn5XJE73AqyQ5mTmG06cZEG8z_kylcmV_xr6nvASV5DXhzH5DinwVzMWPIDoehvjou2fCGCS4bKWSVvn4i3cYlTfU8w9tWadl1ilVVd6dyKeacsH9YhoHZcTRPOJodR7PjWL0vH1_z4PxHTdwCTJ6fMw"
                ],
                "sourcerecordid": [
                    "2667849971"
                ],
                "originalsourceid": [
                    "FETCH-LOGICAL-a470t-89246226d307cf2575a7ec881f6e04f37c7d7a0d4b0de37ad0411fe8843a774e3"
                ],
                "sourcetype": [
                    "Open Access Repository"
                ],
                "sourceformat": [
                    "XML"
                ],
                "sourcesystem": [
                    "Other"
                ],
                "pqid": [
                    "2667849971"
                ],
                "score": [
                    "0.058379356"
                ]
            }
        },
        "delivery": {
            "link": [],
            "deliveryCategory": [
                "Remote Search Resource"
            ],
            "availability": [
                "fulltext"
            ],
            "displayLocation": false,
            "additionalLocations": false,
            "physicalItemTextCodes": "",
            "feDisplayOtherLocations": false,
            "displayedAvailability": "true",
            "holding": [],
            "almaOpenurl": "https://na03.alma.exlibrisgroup.com/view/uresolver/01CASLS_REGINA/openurl?ctx_enc=info:ofi/enc:UTF-8&ctx_id=10_1&ctx_tim=2025-03-06 17:37:06&ctx_ver=Z39.88-2004&url_ctx_fmt=info:ofi/fmt:kev:mtx:ctx&url_ver=Z39.88-2004&rfr_id=info:sid/primo.exlibrisgroup.com-proquest_pubme&rft_val_fmt=info:ofi/fmt:kev:mtx:journal&rft.genre=article&rft.atitle=Comparison+of+Methods+to+Reduce+Bias+From+Clinical+Prediction+Models+of+Postpartum+Depression&rft.jtitle=JAMA+network+open&rft.au=Park%2C+Yoonyoung&rft.date=2021-04-01&rft.volume=4&rft.issue=4&rft.spage=e213909&rft.epage=e213909&rft.pages=e213909-e213909&rft.issn=2574-3805&rft.eissn=2574-3805&rft_id=info:doi/10.1001%2Fjamanetworkopen.2021.3909&rft.pub=American+Medical+Association&rft.place=United+States&rft_id=info:pmid/33856478&rft_dat=<proquest_pubme>2667849971</proquest_pubme>&svc_dat=viewit&rft_pqid=2667849971"
        },
        "context": "PC",
        "adaptor": "Primo Central",
        "extras": {
            "citationTrails": {
                "citing": [
                    "FETCH-LOGICAL-a470t-89246226d307cf2575a7ec881f6e04f37c7d7a0d4b0de37ad0411fe8843a774e3"
                ],
                "citedby": [
                    "FETCH-LOGICAL-a470t-89246226d307cf2575a7ec881f6e04f37c7d7a0d4b0de37ad0411fe8843a774e3"
                ]
            },
            "timesCited": {}
        },
        "@id": "https://na03.alma.exlibrisgroup.com/primaws/rest/pub/pnxs/PC/cdi_pubmedcentral_primary_oai_pubmedcentral_nih_gov_8050742"
    },
    {
        "context": "L",
        "adaptor": "Local Search Engine",
        "@id": "https://na03.alma.exlibrisgroup.com/primaws/rest/pub/pnxs/L/9923198739103476",
        "pnx": {
            "display": {
                "source": [
                    "Alma"
                ],
                "type": [
                    "book"
                ],
                "language": [
                    "eng"
                ],
                "title": [
                    "Practical machine learning : tackle the real-world complexities of modern machine learning with innovative and cutting-edge techniques "
                ],
                "format": [
                    "1 online resource (468 p.)",
                    "text file"
                ],
                "identifier": [
                    "$$CLink to WorldCat$$V<a target=\"_blank\" href=\"http://www.worldcat.org/search?q=no:939400288\">939400288</a>;$$CISBN$$V9781784394011;$$CISBN$$V1784394017"
                ],
                "creationdate": [
                    "2016"
                ],
                "creator": [
                    "Gollapudi, Sunila, author.$$QGollapudi, Sunila"
                ],
                "publisher": [
                    "Birmingham : Packt Publishing"
                ],
                "description": [
                    "Tackle the real-world complexities of modern machine learning with innovative, cutting-edge, techniques About This Book Fully-coded working examples using a wide range of machine learning libraries and tools, including Python, R, Julia, and Spark Comprehensive practical solutions taking you into the future of machine learning Go a step further and integrate your machine learning projects with Hadoop Who This Book Is For This book has been created for data scientists who want to see machine learning in action and explore its real-world application. With guidance on everything from the fundamentals of machine learning and predictive analytics to the latest innovations set to lead the big data revolution into the future, this is an unmissable resource for anyone dedicated to tackling current big data challenges. Knowledge of programming (Python and R) and mathematics is advisable if you want to get started immediately. What You Will Learn Implement a wide range of algorithms and techniques for tackling complex data Get to grips with some of the most powerful languages in data science, including R, Python, and Julia Harness the capabilities of Spark and Hadoop to manage and process data successfully Apply the appropriate machine learning technique to address real-world problems Get acquainted with Deep learning and find out how neural networks are being used at the cutting-edge of machine learning Explore the future of machine learning and dive deeper into polyglot persistence, semantic data, and more In Detail Finding meaning in increasingly larger and more complex datasets is a growing demand of the modern world. Machine learning and predictive analytics have become the most important approaches to uncover data gold mines. Machine learning uses complex algorithms to make improved predictions of outcomes based on historical patterns and the behaviour of data sets. Machine learning can deliver dynamic insights into trends, patterns, and relationships within data, immensely valuable to business growth and development. This book explores an extensive range of machine learning techniques uncovering hidden tricks and tips for several types of data using practical and real-world examples. While machine learning can be highly theoretical, this book offers a refreshing hands-on approach without losing sight of the underlying principles. Inside, a full exploration of the various algorithms gives you high-quality guidance so you can begin to see just how e..."
                ],
                "mms": [
                    "9923198739103476"
                ],
                "addtitle": [
                    "Tackle the real-world complexities of modern machine learning with innovative and cutting-edge techniques"
                ],
                "edition": [
                    "1st edition"
                ],
                "series": [
                    "Community experience distilled$$QCommunity experience distilled",
                    "Community experience distilled.$$QCommunity experience distilled."
                ],
                "contents": [
                    "Cover; Copyright; Credits; Foreword; About the Author; Acknowledgments; About the Reviewers; www.PacktPub.com; Preface; Chapter 1: Introduction to  Machine learning; Machine learning; Definition; Core Concepts and Terminology; What is learning?; Data; Labeled and unlabeled data; Tasks; Algorithms; Models; Data and inconsistencies in Machine learning; Under-fitting; Over-fitting; Data instability; Unpredictable data formats; Practical Machine learning examples; Types of learning problems; Classification; Clustering; Forecasting, prediction or regression; Simulation; Optimization",
                    "Supervised learningUnsupervised learning; Semi-supervised learning; Reinforcement learning; Deep learning; Performance measures; Is the solution good?; Mean squared error (MSE); Mean absolute error (MAE); Normalized MSE and MAE (NMSE and NMAE); Solving the errors: bias and variance; Some complementing fields of Machine learning; Data mining; Artificial intelligence (AI); Statistical learning; Data science; Machine learning process lifecycle and solution architecture; Machine learning algorithms; Decision tree based algorithms; Bayesian method based algorithms; Kernel method based algorithms",
                    "Clustering methodsArtificial neural networks (ANN); Dimensionality reduction; Ensemble methods; Instance based learning algorithms; Regression analysis based algorithms; Association rule based learning algorithms; Machine learning tools and frameworks; Summary; Chapter 2: Machine learning and  Large-scale datasets; Big data and the context of large-scale Machine learning; Functional versus Structural - A methodological mismatch; Commoditizing information; Theoretical limitations of RDBMS; Scaling-up versus Scaling-out storage; Distributed and parallel computing strategies",
                    "Machine learning: Scalability and PerformanceToo many data points or instances; Too many attributes or features; Shrinking response time windows - need for  real-time responses; Highly complex algorithm; Feed forward, iterative prediction cycles; Model selection process; Potential issues in large-scale Machine learning; Algorithms and Concurrency; Developing concurrent algorithms; Technology and implementation options for scaling-up Machine learning; MapReduce programming paradigm; High Performance Computing (HPC) with Message Passing Interface (MPI)",
                    "Language Integrated Queries (LINQ) frameworkManipulating datasets with LINQ; Graphics Processing Unit (GPU); Field Programmable Gate Array (FPGA); Multicore or multiprocessor systems; Summary; Chapter 3: An Introduction to Hadoop's Architecture and Ecosystem; Introduction to Apache Hadoop; Evolution of Hadoop (the platform of choice); Hadoop and its core elements; Machine learning solution architecture for big data (employing Hadoop); The Data Source layer; The Ingestion layer; The Hadoop Storage layer; The Hadoop (Physical) Infrastructure layer - supporting appliance",
                    "Hadoop platform / Processing layer"
                ],
                "place": [
                    "Birmingham :"
                ],
                "version": [
                    "1"
                ],
                "lds07": [
                    "Machine learning"
                ],
                "subject": [
                    "Machine learning"
                ]
            },
            "control": {
                "sourcerecordid": [
                    "9923198739103476"
                ],
                "recordid": [
                    "alma9923198739103476"
                ],
                "sourceid": "alma",
                "originalsourceid": [
                    "(CKB)3710000000587604"
                ],
                "sourcesystem": [
                    "SAFARI"
                ],
                "sourceformat": [
                    "MARC21"
                ],
                "score": [
                    0.0539335531
                ],
                "isDedup": false,
                "save_score": [
                    0.00288983175
                ]
            },
            "addata": {
                "originatingSystemIDAuthor": [
                    "no2019105552"
                ],
                "aulast": [
                    "Gollapudi"
                ],
                "aufirst": [
                    "Sunila"
                ],
                "auinit": [
                    "S"
                ],
                "au": [
                    "Gollapudi, Sunila"
                ],
                "creatorfull": [
                    "$$NGollapudi, Sunila$$LGollapudi$$FSunila$$Rauthor"
                ],
                "addtitle": [
                    "Tackle the real-world complexities of modern machine learning with innovative and cutting-edge techniques"
                ],
                "date": [
                    "2016"
                ],
                "isbn": [
                    "9781784394011",
                    "1784394017",
                    "9781784399689",
                    "178439968X"
                ],
                "abstract": [
                    "Tackle the real-world complexities of modern machine learning with innovative, cutting-edge, techniques About This Book Fully-coded working examples using a wide range of machine learning libraries and tools, including Python, R, Julia, and Spark Comprehensive practical solutions taking you into the future of machine learning Go a step further and integrate your machine learning projects with Hadoop Who This Book Is For This book has been created for data scientists who want to see machine learning in action and explore its real-world application. With guidance on everything from the fundamentals of machine learning and predictive analytics to the latest innovations set to lead the big data revolution into the future, this is an unmissable resource for anyone dedicated to tackling current big data challenges. Knowledge of programming (Python and R) and mathematics is advisable if you want to get started immediately. What You Will Learn Implement a wide range of algorithms and techniques for tackling complex data Get to grips with some of the most powerful languages in data science, including R, Python, and Julia Harness the capabilities of Spark and Hadoop to manage and process data successfully Apply the appropriate machine learning technique to address real-world problems Get acquainted with Deep learning and find out how neural networks are being used at the cutting-edge of machine learning Explore the future of machine learning and dive deeper into polyglot persistence, semantic data, and more In Detail Finding meaning in increasingly larger and more complex datasets is a growing demand of the modern world. Machine learning and predictive analytics have become the most important approaches to uncover data gold mines. Machine learning uses complex algorithms to make improved predictions of outcomes based on historical patterns and the behaviour of data sets. Machine learning can deliver dynamic insights into trends, patterns, and relationships within data, immensely valuable to business growth and development. This book explores an extensive range of machine learning techniques uncovering hidden tricks and tips for several types of data using practical and real-world examples. While machine learning can be highly theoretical, this book offers a refreshing hands-on approach without losing sight of the underlying principles. Inside, a full exploration of the various algorithms gives you high-quality guidance so you can begin to see just how e..."
                ],
                "cop": [
                    "Birmingham"
                ],
                "pub": [
                    "Packt Publishing"
                ],
                "oclcid": [
                    "(ocolc)939400288"
                ],
                "edition": [
                    "1st edition"
                ],
                "seriestitle": [
                    "Community experience distilled"
                ],
                "format": [
                    "book"
                ],
                "genre": [
                    "book"
                ],
                "ristype": [
                    "BOOK"
                ],
                "btitle": [
                    "Practical machine learning : tackle the real-world complexities of modern machine learning with innovative and cutting-edge techniques"
                ]
            },
            "sort": {
                "title": [
                    "Practical machine learning : tackle the real-world complexities of modern machine learning with innovative and cutting-edge techniques /"
                ],
                "author": [
                    "Gollapudi, Sunila, author."
                ],
                "creationdate": [
                    "2016"
                ]
            },
            "facets": {
                "frbrtype": [
                    "6"
                ],
                "frbrgroupid": [
                    "9058151681158937963"
                ]
            }
        }
    },
    {
        "pnx": {
            "links": {
                "linktopdf": [
                    "$$Uhttps://www.ncbi.nlm.nih.gov/pmc/articles/PMC9929722/pdf/$$EPDF$$P50$$Gpubmedcentral$$Hfree_for_read"
                ],
                "linktohtml": [
                    "$$Uhttps://www.ncbi.nlm.nih.gov/pmc/articles/PMC9929722/$$EHTML$$P50$$Gpubmedcentral$$Hfree_for_read"
                ],
                "openurlfulltext": [
                    "$$Topenurlfull_article"
                ],
                "openurl": [
                    "$$Topenurl_article"
                ],
                "backlink": [
                    "$$Uhttps://www.ncbi.nlm.nih.gov/pubmed/36719717$$D View this record in MEDLINE/PubMed$$Hfree_for_read"
                ],
                "thumbnail": [
                    "$$Tsyndetics_thumb_exl"
                ]
            },
            "search": {
                "description": [
                    "Child abuse and neglect, once viewed as a social problem, is now an epidemic. Moreover, health providers agree that existing stereotypes may link racial and social class issues to child abuse. The broad adoption of electronic health records (EHRs) in clinical settings offers a new avenue for addressing this epidemic. To reduce racial bias and improve the development, implementation, and outcomes of machine learning (ML)-based models that use EHR data, it is crucial to involve marginalized members of the community in the process.\nThis study elicited Black and Latinx primary caregivers' viewpoints regarding child abuse and neglect while living in underserved communities to highlight considerations for designing an ML-based model for detecting child abuse and neglect in emergency departments (EDs) with implications for racial bias reduction and future interventions.\nWe conducted a qualitative study using in-depth interviews with 20 Black and Latinx primary caregivers whose children were cared for at a single pediatric tertiary-care ED to gain insights about child abuse and neglect and their experiences with health providers.\nThree central themes were developed in the coding process: (1) primary caregivers' perspectives on the definition of child abuse and neglect, (2) primary caregivers' experiences with health providers and medical documentation, and (3) primary caregivers' perceptions of child protective services.\nOur findings highlight essential considerations from primary caregivers for developing an ML-based model for detecting child abuse and neglect in ED settings. This includes how to define child abuse and neglect from a primary caregiver lens. Miscommunication between patients and health providers can potentially lead to a misdiagnosis, and therefore, have a negative impact on medical documentation. Additionally, the outcome and application of the ML-based models for detecting abuse and neglect may cause additional harm than expected to the community. Further research is needed to validate these findings and integrate them into creating an ML-based model."
                ],
                "orcidid": [
                    "https://orcid.org/0000-0002-9518-1136",
                    "https://orcid.org/0000-0002-3208-905X",
                    "https://orcid.org/0000-0003-3715-7709",
                    "https://orcid.org/0000-0002-0704-3826",
                    "https://orcid.org/0000-0002-1109-6373",
                    "https://orcid.org/0000-0002-9602-5741",
                    "https://orcid.org/0000-0002-2358-9837"
                ],
                "creator": [
                    "Landau, Aviv Y",
                    "Blanchard, Ashley",
                    "Atkins, Nia",
                    "Salazar, Stephanie",
                    "Cato, Kenrick",
                    "Patton, Desmond U",
                    "Topaz, Maxim"
                ],
                "title": [
                    "Black and Latinx Primary Caregiver Considerations for Developing and Implementing a Machine Learning-Based Model for Detecting Child Abuse and Neglect With Implications for Racial Bias Reduction: Qualitative Interview Study With Primary Caregivers",
                    "JMIR formative research"
                ],
                "subject": [
                    "Bias",
                    "Caregivers",
                    "COVID-19 Pandemic, 2020-",
                    "Documentation",
                    "Electronic Health Records",
                    "Ethics",
                    "Interviews",
                    "Machine learning",
                    "Pediatrics",
                    "Qualitative research",
                    "Race",
                    "Racism",
                    "Social workers"
                ],
                "issn": [
                    "2561-326X",
                    "2561-326X"
                ],
                "fulltext": [
                    "true"
                ],
                "addtitle": [
                    "JMIR Form Res"
                ],
                "general": [
                    "JMIR Publications"
                ],
                "startdate": [
                    "20230131"
                ],
                "enddate": [
                    "20230131"
                ],
                "recordtype": [
                    "article"
                ],
                "sourceid": [
                    "DOA"
                ],
                "recordid": [
                    "eNplkk2P0zAQhiMEYldL_wKyhJC4FGI7TmIOSNvyVanLxwKCmzW1J62LGxc7Kewv54o3LasunDya953H4_Fk2YjmTxmV5bMip7K4k50yUdIxZ-W3u0fxSTaKcZ3nOaO0rCS_n53wsqKyotVp9nviQH8n0Boyh862v8iHYDcQrsgUAi7tDgOZ-jZagyHpKSKND-Ql7tD5rW2XQ-lss3W4wbYbEuQC9Mq2SOYIoU2p8QQiGnLhDbpDeYd6ME9X1hlyvugjDqR3uHRJIl9ttxqwVh9dewnagiMTC5Fcoun1tfScfOzB2S75dkhmbYdhZ_En-dT15moP-u9N8UF2rwEXcXQ4z7Ivr199nr4dz9-_mU3P52PNBe3G0hRFYwCYqCsjFryUta4ZQo5U5BqoqXTe1EY2wEWzMAtBGyMKUSOnJVRVwc-y2Z5rPKzVdt-H8mDVkPBhqSB0VjtUhhYJ3qBJH1M0olwwbYQs8zI3dWG0TqwXe9a2X2zQ6DTvAO4W9LbS2pVa-p2SksmKsQR4cgAE_6PH2KmNjRqdgxZ9HxWrKso5o0WZrI_-sa59H9o0KsUkrQXjdUGT6_HepYOPMWBz0wzN1fVmqmEzk-_hcec3rr97yP8AQjnjBg"
                ],
                "scope": [
                    "NPM",
                    "AAYXX",
                    "CITATION",
                    "3V.",
                    "7RV",
                    "7X7",
                    "7XB",
                    "8FI",
                    "8FJ",
                    "8FK",
                    "ABUWG",
                    "AFKRA",
                    "AZQEC",
                    "BENPR",
                    "CCPQU",
                    "DWQXO",
                    "FYUFA",
                    "GHDGH",
                    "K9.",
                    "KB0",
                    "M0S",
                    "NAPCQ",
                    "PHGZM",
                    "PHGZT",
                    "PIMPY",
                    "PKEHL",
                    "PPXIY",
                    "PQEST",
                    "PQQKQ",
                    "PQUKI",
                    "7X8",
                    "5PM",
                    "DOA"
                ],
                "creationdate": [
                    "2023"
                ],
                "creatorcontrib": [
                    "Landau, Aviv Y",
                    "Blanchard, Ashley",
                    "Atkins, Nia",
                    "Salazar, Stephanie",
                    "Cato, Kenrick",
                    "Patton, Desmond U",
                    "Topaz, Maxim"
                ],
                "rsrctype": [
                    "article"
                ]
            },
            "delivery": {
                "fulltext": [
                    "fulltext"
                ],
                "delcategory": [
                    "Remote Search Resource"
                ]
            },
            "display": {
                "description": [
                    "Child abuse and neglect, once viewed as a social problem, is now an epidemic. Moreover, health providers agree that existing stereotypes may link racial and social class issues to child abuse. The broad adoption of electronic health records (EHRs) in clinical settings offers a new avenue for addressing this epidemic. To reduce racial bias and improve the development, implementation, and outcomes of machine learning (ML)-based models that use EHR data, it is crucial to involve marginalized members of the community in the process.\nThis study elicited Black and Latinx primary caregivers' viewpoints regarding child abuse and neglect while living in underserved communities to highlight considerations for designing an ML-based model for detecting child abuse and neglect in emergency departments (EDs) with implications for racial bias reduction and future interventions.\nWe conducted a qualitative study using in-depth interviews with 20 Black and Latinx primary caregivers whose children were cared for at a single pediatric tertiary-care ED to gain insights about child abuse and neglect and their experiences with health providers.\nThree central themes were developed in the coding process: (1) primary caregivers' perspectives on the definition of child abuse and neglect, (2) primary caregivers' experiences with health providers and medical documentation, and (3) primary caregivers' perceptions of child protective services.\nOur findings highlight essential considerations from primary caregivers for developing an ML-based model for detecting child abuse and neglect in ED settings. This includes how to define child abuse and neglect from a primary caregiver lens. Miscommunication between patients and health providers can potentially lead to a misdiagnosis, and therefore, have a negative impact on medical documentation. Additionally, the outcome and application of the ML-based models for detecting abuse and neglect may cause additional harm than expected to the community. Further research is needed to validate these findings and integrate them into creating an ML-based model."
                ],
                "publisher": [
                    "Canada: JMIR Publications"
                ],
                "ispartof": [
                    "JMIR formative research, 2023-01, Vol.7, p.e40194-e40194"
                ],
                "identifier": [
                    "ISSN: 2561-326X",
                    "EISSN: 2561-326X",
                    "DOI: 10.2196/40194",
                    "PMID: 36719717"
                ],
                "rights": [
                    "Aviv Y Landau, Ashley Blanchard, Nia Atkins, Stephanie Salazar, Kenrick Cato, Desmond U Patton, Maxim Topaz. Originally published in JMIR Formative Research (https://formative.jmir.org), 31.01.2023.",
                    "2023. This work is licensed under https://creativecommons.org/licenses/by/4.0/ (the “License”). Notwithstanding the ProQuest Terms and Conditions, you may use this content in accordance with the terms of the License.",
                    "Aviv Y Landau, Ashley Blanchard, Nia Atkins, Stephanie Salazar, Kenrick Cato, Desmond U Patton, Maxim Topaz. Originally published in JMIR Formative Research (https://formative.jmir.org), 31.01.2023. 2023"
                ],
                "snippet": [
                    ".... To reduce racial bias and improve the development, implementation, and outcomes of machine learning (ML..."
                ],
                "creator": [
                    "Landau, Aviv Y ; Blanchard, Ashley ; Atkins, Nia ; Salazar, Stephanie ; Cato, Kenrick ; Patton, Desmond U ; Topaz, Maxim"
                ],
                "title": [
                    "Black and Latinx Primary Caregiver Considerations for Developing and Implementing a Machine Learning-Based Model for Detecting Child Abuse and Neglect With Implications for Racial Bias Reduction: Qualitative Interview Study With Primary Caregivers"
                ],
                "lds50": [
                    "peer_reviewed"
                ],
                "type": [
                    "article"
                ],
                "source": [
                    "PubMed Central Open Access",
                    "PubMed (Medline)",
                    "DOAJ Open Access Full Text",
                    "EZB-FREE-00999 freely available EZB journals"
                ],
                "language": [
                    "eng"
                ],
                "oa": [
                    "free_for_read"
                ],
                "subject": [
                    "Bias ;  Caregivers ;  COVID-19 Pandemic, 2020- ;  Documentation ;  Electronic Health Records ;  Ethics ;  Interviews ;  Machine learning ;  Pediatrics ;  Qualitative research ;  Race ;  Racism ;  Social workers"
                ],
                "keyword": [
                    "Child abuse & neglect ;  Children & youth ;  Community ;  Health care ;  Original Paper"
                ]
            },
            "facets": {
                "creationdate": [
                    "2023"
                ],
                "creatorcontrib": [
                    "Landau, Aviv Y",
                    "Blanchard, Ashley",
                    "Atkins, Nia",
                    "Salazar, Stephanie",
                    "Cato, Kenrick",
                    "Patton, Desmond U",
                    "Topaz, Maxim"
                ],
                "language": [
                    "eng"
                ],
                "toplevel": [
                    "peer_reviewed",
                    "online_resources"
                ],
                "frbrgroupid": [
                    "cdi_FETCH-LOGICAL-c351t-9d44fdaa2587d5b3698c82ea0e150ca1d7c0f8d9fa35fbdb51fd5458e316a7743"
                ],
                "frbrtype": [
                    "5"
                ],
                "jtitle": [
                    "JMIR formative research"
                ],
                "topic": [
                    "Bias",
                    "Caregivers",
                    "COVID-19 Pandemic, 2020-",
                    "Documentation",
                    "Electronic Health Records",
                    "Ethics",
                    "Interviews",
                    "Machine learning",
                    "Pediatrics",
                    "Qualitative research",
                    "Race",
                    "Racism",
                    "Social workers"
                ],
                "prefilter": [
                    "articles"
                ],
                "rsrctype": [
                    "articles"
                ],
                "collection": [
                    "PubMed",
                    "CrossRef",
                    "ProQuest Central (Corporate)",
                    "Nursing & Allied Health Database",
                    "Health & Medical Collection",
                    "ProQuest Central (purchase pre-March 2016)",
                    "ProQuest Hospital Collection",
                    "Hospital Premium Collection (Alumni Edition)",
                    "ProQuest Central (Alumni) (purchase pre-March 2016)",
                    "ProQuest Central",
                    "ProQuest Central UK/Ireland",
                    "ProQuest Central Essentials",
                    "ProQuest Central",
                    "ProQuest One Community College",
                    "ProQuest Central",
                    "Health Research Premium Collection",
                    "Health Research Premium Collection (Alumni)",
                    "ProQuest Health & Medical Complete (Alumni)",
                    "Nursing & Allied Health Database (Alumni Edition)",
                    "Health & Medical Collection (Alumni)",
                    "Nursing & Allied Health Premium",
                    "ProQuest Central (New)",
                    "ProQuest One Academic (New)",
                    "Publicly Available Content Database",
                    "ProQuest One Academic Middle East (New)",
                    "ProQuest One Health & Nursing",
                    "ProQuest One Academic Eastern Edition (DO NOT USE)",
                    "ProQuest One Academic",
                    "ProQuest One Academic UKI Edition",
                    "MEDLINE - Academic",
                    "PubMed Central (Full Participant titles)",
                    "DOAJ Open Access Full Text"
                ]
            },
            "addata": {
                "format": [
                    "journal"
                ],
                "ristype": [
                    "JOUR"
                ],
                "cop": [
                    "Canada"
                ],
                "pub": [
                    "JMIR Publications"
                ],
                "doi": [
                    "10.2196/40194"
                ],
                "pmid": [
                    "36719717"
                ],
                "au": [
                    "Landau, Aviv Y",
                    "Blanchard, Ashley",
                    "Atkins, Nia",
                    "Salazar, Stephanie",
                    "Cato, Kenrick",
                    "Patton, Desmond U",
                    "Topaz, Maxim"
                ],
                "atitle": [
                    "Black and Latinx Primary Caregiver Considerations for Developing and Implementing a Machine Learning-Based Model for Detecting Child Abuse and Neglect With Implications for Racial Bias Reduction: Qualitative Interview Study With Primary Caregivers"
                ],
                "date": [
                    "2023-01-31"
                ],
                "risdate": [
                    "2023"
                ],
                "volume": [
                    "7"
                ],
                "spage": [
                    "e40194"
                ],
                "epage": [
                    "e40194"
                ],
                "pages": [
                    "e40194-e40194"
                ],
                "eissn": [
                    "2561-326X"
                ],
                "orcidid": [
                    "https://orcid.org/0000-0002-9518-1136",
                    "https://orcid.org/0000-0002-3208-905X",
                    "https://orcid.org/0000-0003-3715-7709",
                    "https://orcid.org/0000-0002-0704-3826",
                    "https://orcid.org/0000-0002-1109-6373",
                    "https://orcid.org/0000-0002-9602-5741",
                    "https://orcid.org/0000-0002-2358-9837"
                ],
                "issn": [
                    "2561-326X"
                ],
                "addtitle": [
                    "JMIR Form Res"
                ],
                "abstract": [
                    "Child abuse and neglect, once viewed as a social problem, is now an epidemic. Moreover, health providers agree that existing stereotypes may link racial and social class issues to child abuse. The broad adoption of electronic health records (EHRs) in clinical settings offers a new avenue for addressing this epidemic. To reduce racial bias and improve the development, implementation, and outcomes of machine learning (ML)-based models that use EHR data, it is crucial to involve marginalized members of the community in the process.\nThis study elicited Black and Latinx primary caregivers' viewpoints regarding child abuse and neglect while living in underserved communities to highlight considerations for designing an ML-based model for detecting child abuse and neglect in emergency departments (EDs) with implications for racial bias reduction and future interventions.\nWe conducted a qualitative study using in-depth interviews with 20 Black and Latinx primary caregivers whose children were cared for at a single pediatric tertiary-care ED to gain insights about child abuse and neglect and their experiences with health providers.\nThree central themes were developed in the coding process: (1) primary caregivers' perspectives on the definition of child abuse and neglect, (2) primary caregivers' experiences with health providers and medical documentation, and (3) primary caregivers' perceptions of child protective services.\nOur findings highlight essential considerations from primary caregivers for developing an ML-based model for detecting child abuse and neglect in ED settings. This includes how to define child abuse and neglect from a primary caregiver lens. Miscommunication between patients and health providers can potentially lead to a misdiagnosis, and therefore, have a negative impact on medical documentation. Additionally, the outcome and application of the ML-based models for detecting abuse and neglect may cause additional harm than expected to the community. Further research is needed to validate these findings and integrate them into creating an ML-based model."
                ],
                "jtitle": [
                    "JMIR formative research"
                ],
                "genre": [
                    "article"
                ],
                "oa": [
                    "free_for_read"
                ]
            },
            "sort": {
                "title": [
                    "Black and Latinx Primary Caregiver Considerations for Developing and Implementing a Machine Learning-Based Model for Detecting Child Abuse and Neglect With Implications for Racial Bias Reduction: Qualitative Interview Study With Primary Caregivers"
                ],
                "creationdate": [
                    "20230131"
                ],
                "author": [
                    "Landau, Aviv Y ; Blanchard, Ashley ; Atkins, Nia ; Salazar, Stephanie ; Cato, Kenrick ; Patton, Desmond U ; Topaz, Maxim"
                ]
            },
            "control": {
                "iscdi": [
                    "true"
                ],
                "doajid": [
                    "oai_doaj_org_article_d148c8fed7174f56b2cd596060d84dcc"
                ],
                "recordtype": [
                    "article"
                ],
                "sourceid": [
                    "proquest_doaj_"
                ],
                "recordid": [
                    "cdi_doaj_primary_oai_doaj_org_article_d148c8fed7174f56b2cd596060d84dcc"
                ],
                "addsrcrecordid": [
                    "eNplkk2P0zAQhiMEYldL_wKyhJC4FGI7TmIOSNvyVanLxwKCmzW1J62LGxc7Kewv54o3LasunDya953H4_Fk2YjmTxmV5bMip7K4k50yUdIxZ-W3u0fxSTaKcZ3nOaO0rCS_n53wsqKyotVp9nviQH8n0Boyh862v8iHYDcQrsgUAi7tDgOZ-jZagyHpKSKND-Ql7tD5rW2XQ-lss3W4wbYbEuQC9Mq2SOYIoU2p8QQiGnLhDbpDeYd6ME9X1hlyvugjDqR3uHRJIl9ttxqwVh9dewnagiMTC5Fcoun1tfScfOzB2S75dkhmbYdhZ_En-dT15moP-u9N8UF2rwEXcXQ4z7Ivr199nr4dz9-_mU3P52PNBe3G0hRFYwCYqCsjFryUta4ZQo5U5BqoqXTe1EY2wEWzMAtBGyMKUSOnJVRVwc-y2Z5rPKzVdt-H8mDVkPBhqSB0VjtUhhYJ3qBJH1M0olwwbYQs8zI3dWG0TqwXe9a2X2zQ6DTvAO4W9LbS2pVa-p2SksmKsQR4cgAE_6PH2KmNjRqdgxZ9HxWrKso5o0WZrI_-sa59H9o0KsUkrQXjdUGT6_HepYOPMWBz0wzN1fVmqmEzk-_hcec3rr97yP8AQjnjBg"
                ],
                "sourcerecordid": [
                    "2918523841"
                ],
                "originalsourceid": [
                    "FETCH-LOGICAL-c351t-9d44fdaa2587d5b3698c82ea0e150ca1d7c0f8d9fa35fbdb51fd5458e316a7743"
                ],
                "sourcetype": [
                    "Open Website"
                ],
                "sourceformat": [
                    "XML"
                ],
                "sourcesystem": [
                    "Other"
                ],
                "pqid": [
                    "2918523841"
                ],
                "score": [
                    "0.053933553"
                ]
            }
        },
        "delivery": {
            "link": [],
            "deliveryCategory": [
                "Remote Search Resource"
            ],
            "availability": [
                "fulltext"
            ],
            "displayLocation": false,
            "additionalLocations": false,
            "physicalItemTextCodes": "",
            "feDisplayOtherLocations": false,
            "displayedAvailability": "true",
            "holding": [],
            "almaOpenurl": "https://na03.alma.exlibrisgroup.com/view/uresolver/01CASLS_REGINA/openurl?ctx_enc=info:ofi/enc:UTF-8&ctx_id=10_1&ctx_tim=2025-03-06 17:37:06&ctx_ver=Z39.88-2004&url_ctx_fmt=info:ofi/fmt:kev:mtx:ctx&url_ver=Z39.88-2004&rfr_id=info:sid/primo.exlibrisgroup.com-proquest_doaj_&rft_val_fmt=info:ofi/fmt:kev:mtx:journal&rft.genre=article&rft.atitle=Black+and+Latinx+Primary+Caregiver+Considerations+for+Developing+and+Implementing+a+Machine+Learning-Based+Model+for+Detecting+Child+Abuse+and+Neglect+With+Implications+for+Racial+Bias+Reduction%3A+Qualitative+Interview+Study+With+Primary+Caregivers&rft.jtitle=JMIR+formative+research&rft.au=Landau%2C+Aviv+Y&rft.date=2023-01-31&rft.volume=7&rft.spage=e40194&rft.epage=e40194&rft.pages=e40194-e40194&rft.issn=2561-326X&rft.eissn=2561-326X&rft_id=info:doi/10.2196%2F40194&rft.pub=JMIR+Publications&rft.place=Canada&rft_id=info:pmid/36719717&rft_dat=<proquest_doaj_>2918523841</proquest_doaj_>&svc_dat=viewit&rft_pqid=2918523841"
        },
        "context": "PC",
        "adaptor": "Primo Central",
        "extras": {
            "citationTrails": {
                "citing": [
                    "FETCH-LOGICAL-c351t-9d44fdaa2587d5b3698c82ea0e150ca1d7c0f8d9fa35fbdb51fd5458e316a7743"
                ],
                "citedby": []
            },
            "timesCited": {}
        },
        "@id": "https://na03.alma.exlibrisgroup.com/primaws/rest/pub/pnxs/PC/cdi_doaj_primary_oai_doaj_org_article_d148c8fed7174f56b2cd596060d84dcc"
    },
    {
        "context": "L",
        "adaptor": "Local Search Engine",
        "@id": "https://na03.alma.exlibrisgroup.com/primaws/rest/pub/pnxs/L/9923620688603476",
        "pnx": {
            "display": {
                "source": [
                    "Alma"
                ],
                "type": [
                    "book"
                ],
                "language": [
                    "eng"
                ],
                "title": [
                    "Debugging machine learning models with Python : develop high-performance, low-bias, and explainable machine learning and deep learning models "
                ],
                "format": [
                    "1 online resource (345 pages)"
                ],
                "identifier": [
                    "$$CLink to WorldCat$$V<a target=\"_blank\" href=\"http://www.worldcat.org/search?q=no:1395886444\">1395886444</a>;$$CISBN$$V9781800201132;$$CISBN$$V1800201133"
                ],
                "creationdate": [
                    "2023"
                ],
                "creator": [
                    "Madanipour, Ali, author.$$QMadanipour, Ali"
                ],
                "publisher": [
                    "Birmingham, England : Packt Publishing"
                ],
                "description": [
                    "Debugging Machine Learning Models with Python is a comprehensive guide that navigates you through the entire spectrum of mastering machine learning, from foundational concepts to advanced techniques. It goes beyond the basics to arm you with the expertise essential for building reliable, high-performance models for industrial applications. Whether you're a data scientist, analyst, machine learning engineer, or Python developer, this book will empower you to design modular systems for data preparation, accurately train and test models, and seamlessly integrate them into larger technologies. By bridging the gap between theory and practice, you'll learn how to evaluate model performance, identify and address issues, and harness recent advancements in deep learning and generative modeling using PyTorch and scikit-learn. Your journey to developing high quality models in practice will also encompass causal and human-in-the-loop modeling and machine learning explainability. With hands-on examples and clear explanations, you'll develop the skills to deliver impactful solutions across domains such as healthcare, finance, and e-commerce."
                ],
                "mms": [
                    "9923620688603476"
                ],
                "contributor": [
                    "MacKinnon, Stephen, author.$$QMacKinnon, Stephen"
                ],
                "edition": [
                    "1st ed."
                ],
                "contents": [
                    "Cover -- Title Page -- Copyright -- Dedication -- Foreword -- Contributors -- Table of Contents -- Preface -- Part 1: Debugging for  Machine Learning Modeling -- Chapter 1: Beyond Code Debugging -- Technical requirements -- Machine learning at a glance -- Types of machine learning modeling -- Supervised learning -- Unsupervised learning -- Self-supervised learning -- Semi-supervised learning -- Reinforcement learning -- Generative machine learning -- Debugging in software development -- Error messages in Python -- Debugging techniques -- Debuggers -- Best practices for high-quality Python programming -- Version control -- Debugging beyond Python -- Flaws in data used for modeling -- Data format and structure -- Data quantity and quality -- Data biases -- Model and prediction-centric debugging -- Underfitting and overfitting -- Inference in model testing and production -- Data or hyperparameters for changing landscapes -- Summary -- Questions -- References -- Chapter 2: Machine Learning Life Cycle -- Technical requirements -- Before we start modeling -- Data collection -- Data selection -- Data exploration -- Data wrangling -- Structuring -- Enriching -- Data transformation -- Cleaning -- Modeling data preparation -- Feature selection and extraction -- Designing an evaluation and testing strategy -- Model training and evaluation -- Testing the code and the model -- Model deployment and monitoring -- Summary -- Questions -- References -- Chapter 3: Debugging toward Responsible AI -- Technical requirements -- Impartial modeling fairness in machine learning -- Data bias -- Algorithmic bias -- Security and privacy in machine learning -- Data privacy -- Data poisoning -- Adversarial attacks -- Output integrity attacks -- System manipulation -- Secure and private machine learning techniques -- Transparency in machine learning modeling.",
                    "Accountable and open to inspection modeling -- Data and model governance -- Summary -- Questions -- References -- Part 2: Improving Machine  Learning Models -- Chapter 4: Detecting Performance and Efficiency Issues in Machine Learning Models -- Technical requirements -- Performance and error assessment measures -- Classification -- Regression -- Clustering -- Visualization for performance assessment -- Summary metrics are not enough -- Visualizations could be misleading -- Don't interpret your plots as you wish -- Bias and variance diagnosis -- Model validation strategy -- Error analysis -- Beyond performance -- Summary -- Questions -- References -- Chapter 5: Improving the Performance of Machine Learning Models -- Technical requirements -- Options for improving model performance -- Grid search -- Random search -- Bayesian search -- Successive halving -- Synthetic data generation -- Oversampling for imbalanced data -- Improving pre-training data processing -- Anomaly detection and outlier removal -- Benefitting from data of lower quality or relevance -- Regularization to improve model generalizability -- Summary -- Questions -- References -- Chapter 6: Interpretability and Explainability in Machine Learning Modeling -- Technical requirements -- Interpretable versus black-box machine learning -- Interpretable machine learning models -- Explainability for complex models -- Explainability methods in machine learning -- Local explainability techniques -- Global explanation -- Practicing machine learning explainability in Python -- Explanations in SHAP -- Explanations using LIME -- Counterfactual generation using Diverse Counterfactual Explanations (DiCE) -- Reviewing why having explainability is not enough -- Summary -- Questions -- References -- Chapter 7: Decreasing Bias and Achieving Fairness -- Technical requirements.",
                    "Fairness in machine learning modeling -- Proxies for sensitive variables -- Sources of bias -- Biases introduced in data generation and collection -- Bias in model training and testing -- Bias in production -- Using explainability techniques -- Fairness assessment and improvement in Python -- Summary -- Questions -- References -- Part 3: Low-Bug Machine Learning Development and Deployment -- Chapter 8: Controlling Risks Using Test-Driven Development -- Technical requirements -- Test-driven development for machine learning modeling -- Unit testing -- Machine learning differential testing -- Tracking machine learning experiments -- Summary -- Questions -- References -- Chapter 9: Testing and  Debugging for Production -- Technical requirements -- Infrastructure testing -- Infrastructure as Code tools -- Infrastructure testing tools -- Infrastructure testing using Pytest -- Integration testing of machine learning pipelines -- Integration testing using pytest -- Monitoring and validating live performance -- Model assertion -- Summary -- Questions -- References -- Chapter 10: Versioning and Reproducible Machine Learning Modeling -- Technical requirements -- Reproducibility in machine learning -- Data versioning -- Model versioning -- Summary -- Questions -- References -- Chapter 11: Avoiding and Detecting Data and Concept Drifts -- Technical requirements -- Avoiding drifts in your models -- Avoiding data drift -- Addressing concept drift -- Detecting drifts -- Practicing with alibi_detect for drift detection -- Practicing with evidently for drift detection -- Summary -- Questions -- References -- Part 4: Deep Learning Modeling -- Chapter 12: Going Beyond ML Debugging with Deep Learning -- Technical requirements -- Introduction to artificial neural networks -- Optimization algorithms -- Frameworks for neural network modeling.",
                    "PyTorch for deep learning modeling -- Summary -- Questions -- References -- Chapter 13: Advanced Deep Learning Techniques -- Technical requirements -- Types of neural networks -- Categorization based on data type -- Convolutional neural networks for image shape data -- Performance assessment -- CNN modeling using PyTorch -- Image data transformation and augmentation for CNNs -- Using pre-trained models -- Transformers for language modeling -- Tokenization -- Language embedding -- Language modeling using pre-trained models -- Modeling graphs using deep neural networks -- Graph neural networks -- GNNs with PyTorch Geometric -- Summary -- Questions -- References -- Chapter 14: Introduction to Recent Advancements in Machine Learning -- Technical requirements -- Generative modeling -- Generative deep learning techniques -- Prompt engineering for text-based generative models -- Generative modeling using PyTorch -- Reinforcement learning -- Reinforcement learning with human feedback (RLHF) -- Self-supervised learning (SSL) -- Self-supervised learning with PyTorch -- Summary -- Questions -- References -- Part 5: Advanced Topics  in Model Debugging -- Chapter 15: Correlation versus Causality -- Technical requirements -- Correlation as part of machine learning models -- Causal modeling to reduce risks and improve performance -- Assessing causation in machine learning models -- Causal inference -- Causal modeling using Python -- Using dowhy for causal effect estimation -- Using bnlearn for causal inference through Bayesian networks -- Summary -- Questions -- References -- Chapter 16: Security and Privacy in Machine Learning -- Technical requirements -- Encryption techniques and their use in machine learning -- Implementing AES encryption in Python -- Homomorphic encryption -- Differential privacy -- Federated learning -- Summary -- Questions -- References.",
                    "Chapter 17: Human-in-the-Loop Machine Learning -- Humans in the machine learning life cycle -- Expert feedback collection -- Human-in-the-loop modeling -- Summary -- Questions -- References -- Assessments -- Chapter 1 - Beyond Code Debugging -- Chapter 2 - Machine Learning Life Cycle -- Chapter 3 - Debugging toward Responsible AI -- Chapter 4 - Detecting Performance and Efficiency Issues in Machine Learning Models -- Chapter 5 - Improving the Performance of Machine Learning Models -- Chapter 6 - Interpretability and Explainability in Machine Learning Modeling -- Chapter 7 - Decreasing Bias and Achieving Fairness -- Chapter 8 - Controlling Risks Using Test-Driven Development -- Chapter 9 - Testing and Debugging for Production -- Chapter 10 - Versioning and Reproducible Machine Learning Modeling -- Chapter 11 - Avoiding and Detecting Data and Concept Drifts -- Chapter 12 - Going Beyond ML Debugging with Deep Learning -- Chapter 13 - Advanced Deep Learning Techniques -- Chapter 14 - Introduction to Recent Advancements in Machine Learning -- Chapter 15 - Correlation versus Causality -- Chapter 16 - Security and Privacy in Machine Learning -- Chapter 17 - Human-in-the-Loop Machine Learning -- Index -- About Packt -- Other Books You May Enjoy."
                ],
                "place": [
                    "Birmingham, England :"
                ],
                "version": [
                    "1"
                ],
                "lds07": [
                    "Machine learning -- Computer simulation",
                    "Debugging in computer science -- Computer programs",
                    "Python (Computer program language)"
                ],
                "subject": [
                    "Machine learning -- Computer simulation",
                    "Debugging in computer science -- Computer programs",
                    "Python (Computer program language)"
                ]
            },
            "control": {
                "sourcerecordid": [
                    "9923620688603476"
                ],
                "recordid": [
                    "alma9923620688603476"
                ],
                "sourceid": "alma",
                "originalsourceid": [
                    "(CKB)28102813200041"
                ],
                "sourcesystem": [
                    "EBC"
                ],
                "sourceformat": [
                    "MARC21"
                ],
                "score": [
                    0.05329512585
                ],
                "isDedup": false,
                "save_score": [
                    0.0022514045
                ]
            },
            "addata": {
                "originatingSystemIDAuthor": [
                    "n96041477"
                ],
                "aulast": [
                    "Madanipour"
                ],
                "aufirst": [
                    "Ali"
                ],
                "auinit": [
                    "A"
                ],
                "au": [
                    "Madanipour, Ali"
                ],
                "addau": [
                    "MacKinnon, Stephen"
                ],
                "creatorfull": [
                    "$$NMadanipour, Ali$$LMadanipour$$FAli$$Rauthor"
                ],
                "contributorfull": [
                    "$$NMacKinnon, Stephen$$LMacKinnon$$FStephen$$Rcontributor"
                ],
                "date": [
                    "2023"
                ],
                "isbn": [
                    "9781800201132",
                    "1800201133",
                    "9781800208582",
                    "1800208588"
                ],
                "notes": [
                    "Includes bibliographical references and index."
                ],
                "abstract": [
                    "Debugging Machine Learning Models with Python is a comprehensive guide that navigates you through the entire spectrum of mastering machine learning, from foundational concepts to advanced techniques. It goes beyond the basics to arm you with the expertise essential for building reliable, high-performance models for industrial applications. Whether you're a data scientist, analyst, machine learning engineer, or Python developer, this book will empower you to design modular systems for data preparation, accurately train and test models, and seamlessly integrate them into larger technologies. By bridging the gap between theory and practice, you'll learn how to evaluate model performance, identify and address issues, and harness recent advancements in deep learning and generative modeling using PyTorch and scikit-learn. Your journey to developing high quality models in practice will also encompass causal and human-in-the-loop modeling and machine learning explainability. With hands-on examples and clear explanations, you'll develop the skills to deliver impactful solutions across domains such as healthcare, finance, and e-commerce."
                ],
                "cop": [
                    "Birmingham, England"
                ],
                "pub": [
                    "Packt Publishing"
                ],
                "oclcid": [
                    "(ocolc)1395886444",
                    "(ocolc-p)1395886444"
                ],
                "edition": [
                    "1st ed."
                ],
                "format": [
                    "book"
                ],
                "genre": [
                    "book"
                ],
                "ristype": [
                    "BOOK"
                ],
                "btitle": [
                    "Debugging machine learning models with Python : develop high-performance, low-bias, and explainable machine learning and deep learning models"
                ]
            },
            "sort": {
                "title": [
                    "Debugging machine learning models with Python : develop high-performance, low-bias, and explainable machine learning and deep learning models /"
                ],
                "author": [
                    "Madanipour, Ali, author."
                ],
                "creationdate": [
                    "2023"
                ]
            },
            "facets": {
                "frbrtype": [
                    "6"
                ],
                "frbrgroupid": [
                    "9077038087388265894"
                ]
            }
        }
    },
    {
        "context": "L",
        "adaptor": "Local Search Engine",
        "@id": "https://na03.alma.exlibrisgroup.com/primaws/rest/pub/pnxs/L/9923198510603476",
        "pnx": {
            "display": {
                "source": [
                    "Alma"
                ],
                "type": [
                    "book"
                ],
                "language": [
                    "eng"
                ],
                "title": [
                    "Python machine learning : machine learning and deep learning with Python, scikit-learn, and TensorFlow "
                ],
                "format": [
                    "1 online resource (1 volume) : illustrations",
                    "text file"
                ],
                "identifier": [
                    "$$CLink to WorldCat$$V<a target=\"_blank\" href=\"http://www.worldcat.org/search?q=no:1006894361\">1006894361</a>;$$CISBN$$V9781787125933;$$CISBN$$V1787125939;$$CISBN$$V9781787126022;$$CISBN$$V1787126021"
                ],
                "creationdate": [
                    "2017"
                ],
                "creator": [
                    "Raschka, Sebastian, author.$$QRaschka, Sebastian"
                ],
                "publisher": [
                    "Birmingham, England ; Mumbai, India : Packt"
                ],
                "description": [
                    "Unlock modern machine learning and deep learning techniques with Python by using the latest cutting-edge open source Python libraries. About This Book Second edition of the bestselling book on Machine Learning A practical approach to key frameworks in data science, machine learning, and deep learning Use the most powerful Python libraries to implement machine learning and deep learning Get to know the best practices to improve and optimize your machine learning systems and algorithms Who This Book Is For If you know some Python and you want to use machine learning and deep learning, pick up this book. Whether you want to start from scratch or extend your machine learning knowledge, this is an essential and unmissable resource. Written for developers and data scientists who want to create practical machine learning and deep learning code, this book is ideal for developers and data scientists who want to teach computers how to learn from data. What You Will Learn Understand the key frameworks in data science, machine learning, and deep learning Harness the power of the latest Python open source libraries in machine learning Explore machine learning techniques using challenging real-world data Master deep neural network implementation using the TensorFlow library Learn the mechanics of classification algorithms to implement the best tool for the job Predict continuous target outcomes using regression analysis Uncover hidden patterns and structures in data with clustering Delve deeper into textual and social media data using sentiment analysis In Detail Machine learning is eating the software world, and now deep learning is extending machine learning. Understand and work at the cutting edge of machine learning, neural networks, and deep learning with this second edition of Sebastian Raschka’s bestselling book, Python Machine Learning. Thoroughly updated using the latest Python open source libraries, this book offers the practical knowledge and techniques you need to create and contribute to machine learning, deep learning, and modern data analysis. Fully extended and modernized, Python Machine Learning Second Edition now includes the popular TensorFlow deep learning library. The scikit-learn code has also been fully updated to include recent improvements and additions to this versatile machine learning library. Sebastian Raschka and Vahid Mirjalili’s unique insight and expertise introduce you to machine learning and deep learning algorithms from s..."
                ],
                "mms": [
                    "9923198510603476"
                ],
                "contributor": [
                    "Mirajalili, Vahid, author.$$QMirajalili, Vahid"
                ],
                "edition": [
                    "Second edition, fully revised and updated."
                ],
                "series": [
                    "Expert Insight$$QExpert Insight"
                ],
                "contents": [
                    "Cover -- Copyright -- Credits -- About the Authors -- About the Reviewers -- www.PacktPub.com -- Packt is Searching for  Authors Like You -- Table of Contents -- Preface -- Chapter 1: Giving Computers the Ability to Learn from Data -- Building intelligent machines to transform data into knowledge -- The three different types of machine learning -- Making predictions about the future with supervised learning -- Classification for predicting class labels -- Regression for predicting continuous outcomes -- Solving interactive problems with reinforcement learning -- Discovering hidden structures with unsupervised learning -- Finding subgroups with clustering -- Dimensionality reduction for data compression -- Introduction to the basic terminology and notations -- A roadmap for building machine learning systems -- Preprocessing - getting data into shape -- Training and selecting a predictive model -- Evaluating models and predicting unseen data instances -- Using Python for machine learning -- Installing Python and packages from the Python Package Index -- Using the Anaconda Python distribution and package manager -- Packages for scientific computing, data science, and machine learning -- Summary -- Chapter 2: Training Simple Machine Learning Algorithms for Classification -- Artificial neurons - a brief glimpse into the early history of machine learning -- The formal definition of an artificial neuron -- The perceptron learning rule -- Implementing a perceptron learning algorithm in Python -- An object-oriented perceptron API -- Training a perceptron model on the Iris dataset -- Adaptive linear neurons and the convergence of learning -- Minimizing cost functions with gradient descent -- Implementing Adaline in Python -- Improving gradient descent through feature scaling -- Large-scale machine learning and stochastic gradient descent -- Summary.",
                    "Chapter 3: A Tour of Machine Learning Classifiers Using scikit-learn -- Choosing a classification algorithm -- First steps with scikit-learn - training a perceptron -- Modeling class probabilities via logistic regression -- Logistic regression intuition and conditional probabilities -- Learning the weights of the logistic cost function -- Converting an Adaline implementation into an algorithm for logistic regression -- Training a logistic regression model with scikit-learn -- Tackling overfitting via regularization -- Maximum margin classification with support vector machines -- Maximum margin intuition -- Dealing with a nonlinearly separable case using slack variables -- Alternative implementations in scikit-learn -- Solving nonlinear problems using a kernel SVM -- Kernel methods for linearly inseparable data -- Using the kernel trick to find separating hyperplanes in high-dimensional space -- Decision tree learning -- Maximizing information gain - getting the most bang for your buck -- Building a decision tree -- Combining multiple decision trees via random forests -- K-nearest neighbors - a lazy learning algorithm -- Summary -- Chapter 4: Building Good Training  Sets - Data Preprocessing -- Dealing with missing data -- Identifying missing values in tabular data -- Eliminating samples or features with missing values -- Imputing missing values -- Understanding the scikit-learn estimator API -- Handling categorical data -- Nominal and ordinal features -- Creating an example dataset -- Mapping ordinal features -- Encoding class labels -- Performing one-hot encoding on nominal features -- Partitioning a dataset into separate training and test sets -- Bringing features onto the same scale -- Selecting meaningful features -- L1 and L2 regularization as penalties against model complexity -- A geometric interpretation of L2 regularization.",
                    "Sparse solutions with L1 regularization -- Sequential feature selection algorithms -- Assessing feature importance with random forests -- Summary -- Chapter 5: Compressing Data via Dimensionality Reduction -- Unsupervised dimensionality reduction via principal component analysis -- The main steps behind principal component analysis -- Extracting the principal components step by step -- Total and explained variance -- Feature transformation -- Principal component analysis in scikit-learn -- Supervised data compression via linear discriminant analysis -- Principal component analysis versus linear discriminant analysis -- The inner workings of linear discriminant analysis -- Computing the scatter matrices -- Selecting linear discriminants for the new feature subspace -- Projecting samples onto the new feature space -- LDA via scikit-learn -- Using kernel principal component analysis for nonlinear mappings -- Kernel functions and the kernel trick -- Implementing a kernel principal component analysis in Python -- Example 1 - separating half-moon shapes -- Example 2 - separating concentric circles -- Projecting new data points -- Kernel principal component analysis in  scikit-learn -- Summary -- Chapter 6: Learning Best Practices for Model Evaluation and Hyperparameter Tuning -- Streamlining workflows with pipelines -- Loading the Breast Cancer Wisconsin dataset -- Combining transformers and estimators in a pipeline -- Using k-fold cross-validation to assess model performance -- The holdout method -- K-fold cross-validation -- Debugging algorithms with learning and validation curves -- Diagnosing bias and variance problems with learning curves -- Addressing over- and underfitting with validation curves -- Fine-tuning machine learning models via grid search -- Tuning hyperparameters via grid search -- Algorithm selection with nested  cross-validation.",
                    "Looking at different performance evaluation metrics -- Reading a confusion matrix -- Optimizing the precision and recall of a classification model -- Plotting a receiver operating characteristic -- Scoring metrics for multiclass classification -- Dealing with class imbalance -- Summary -- Chapter 7: Combining Different Models for Ensemble Learning -- Learning with ensembles -- Combining classifiers via majority vote -- Implementing a simple majority vote classifier -- Using the majority voting principle to make predictions -- Evaluating and tuning the ensemble classifier -- Bagging - building an ensemble of classifiers from bootstrap samples -- Bagging in a nutshell -- Applying bagging to classify samples in the Wine dataset -- Leveraging weak learners via adaptive boosting -- How boosting works -- Applying AdaBoost using scikit-learn -- Summary -- Chapter 8: Applying Machine Learning  to Sentiment Analysis -- Preparing the IMDb movie review data for text processing -- Obtaining the movie review dataset -- Preprocessing the movie dataset into more convenient format -- Introducing the bag-of-words model -- Transforming words into feature vectors -- Assessing word relevancy via term frequency-inverse document frequency -- Cleaning text data -- Processing documents into tokens -- Training a logistic regression model for document classification -- Working with bigger data - online algorithms and out-of-core learning -- Topic modeling with Latent Dirichlet Allocation -- Decomposing text documents with LDA -- LDA with scikit-learn -- Summary -- Chapter 9: Embedding a Machine Learning Model into a  Web Application -- Serializing fitted scikit-learn estimators -- Setting up an SQLite database for data storage -- Developing a web application with Flask -- Our first Flask web application -- Form validation and rendering -- Setting up the directory structure.",
                    "Implementing a macro using the Jinja2 templating engine -- Adding style via CSS -- Creating the result page -- Turning the movie review classifier into a web application -- Files and folders - looking at the directory tree -- Implementing the main application as app.py -- Setting up the review form -- Creating a results page template -- Deploying the web application to a public server -- Creating a PythonAnywhere account -- Uploading the movie classifier application -- Updating the movie classifier -- Summary -- Chapter 10: Predicting Continuous  Target Variables with Regression Analysis -- Introducing linear regression -- Simple linear regression -- Multiple linear regression -- Exploring the Housing dataset -- Loading the Housing dataset into a data frame -- Visualizing the important characteristics of a dataset -- Looking at relationships using a correlation matrix -- Implementing an ordinary least squares linear regression model -- Solving regression for regression parameters with gradient descent -- Estimating coefficient of a regression model via scikit-learn -- Fitting a robust regression model using RANSAC -- Evaluating the performance of linear regression models -- Using regularized methods for regression -- Turning a linear regression model into a curve - polynomial regression -- Adding polynomial terms using scikit-learn -- Modeling nonlinear relationships in the Housing dataset -- Dealing with nonlinear relationships using random forests -- Decision tree regression -- Random forest regression -- Summary -- Chapter 11: Working with Unlabeled  Data - Clustering Analysis -- Grouping objects by similarity using k-means -- K-means clustering using scikit-learn -- A smarter way of placing the initial cluster centroids using k-means++ -- Hard versus soft clustering -- Using the elbow method to find the optimal number of clusters.",
                    "Quantifying the quality of clustering via silhouette plots."
                ],
                "place": [
                    "Birmingham, England ; Mumbai, India] :"
                ],
                "version": [
                    "1"
                ],
                "lds07": [
                    "Python (Computer program language)",
                    "Machine learning"
                ],
                "subject": [
                    "Python (Computer program language)",
                    "Machine learning"
                ]
            },
            "control": {
                "sourcerecordid": [
                    "9923198510603476"
                ],
                "recordid": [
                    "alma9923198510603476"
                ],
                "sourceid": "alma",
                "originalsourceid": [
                    "(CKB)4100000000880930"
                ],
                "sourcesystem": [
                    "SAFARI"
                ],
                "sourceformat": [
                    "MARC21"
                ],
                "score": [
                    0.05326708695
                ],
                "isDedup": false,
                "save_score": [
                    0.0022233656
                ]
            },
            "addata": {
                "originatingSystemIDAuthor": [
                    "no2016023528"
                ],
                "originatingSystemIDContributor": [
                    "no2020036774"
                ],
                "aulast": [
                    "Raschka"
                ],
                "aufirst": [
                    "Sebastian"
                ],
                "auinit": [
                    "S"
                ],
                "au": [
                    "Raschka, Sebastian"
                ],
                "addau": [
                    "Mirajalili, Vahid"
                ],
                "creatorfull": [
                    "$$NRaschka, Sebastian$$LRaschka$$FSebastian$$Rauthor"
                ],
                "contributorfull": [
                    "$$NMirajalili, Vahid$$LMirajalili$$FVahid$$Rcontributor"
                ],
                "date": [
                    "2017 - 2017",
                    "2017"
                ],
                "isbn": [
                    "9781787125933",
                    "1787125939",
                    "9781787126022",
                    "1787126021"
                ],
                "notes": [
                    "Includes bibliographical references at the end of each chapters and index."
                ],
                "abstract": [
                    "Unlock modern machine learning and deep learning techniques with Python by using the latest cutting-edge open source Python libraries. About This Book Second edition of the bestselling book on Machine Learning A practical approach to key frameworks in data science, machine learning, and deep learning Use the most powerful Python libraries to implement machine learning and deep learning Get to know the best practices to improve and optimize your machine learning systems and algorithms Who This Book Is For If you know some Python and you want to use machine learning and deep learning, pick up this book. Whether you want to start from scratch or extend your machine learning knowledge, this is an essential and unmissable resource. Written for developers and data scientists who want to create practical machine learning and deep learning code, this book is ideal for developers and data scientists who want to teach computers how to learn from data. What You Will Learn Understand the key frameworks in data science, machine learning, and deep learning Harness the power of the latest Python open source libraries in machine learning Explore machine learning techniques using challenging real-world data Master deep neural network implementation using the TensorFlow library Learn the mechanics of classification algorithms to implement the best tool for the job Predict continuous target outcomes using regression analysis Uncover hidden patterns and structures in data with clustering Delve deeper into textual and social media data using sentiment analysis In Detail Machine learning is eating the software world, and now deep learning is extending machine learning. Understand and work at the cutting edge of machine learning, neural networks, and deep learning with this second edition of Sebastian Raschka’s bestselling book, Python Machine Learning. Thoroughly updated using the latest Python open source libraries, this book offers the practical knowledge and techniques you need to create and contribute to machine learning, deep learning, and modern data analysis. Fully extended and modernized, Python Machine Learning Second Edition now includes the popular TensorFlow deep learning library. The scikit-learn code has also been fully updated to include recent improvements and additions to this versatile machine learning library. Sebastian Raschka and Vahid Mirjalili’s unique insight and expertise introduce you to machine learning and deep learning algorithms from s..."
                ],
                "cop": [
                    "Birmingham, England ;"
                ],
                "pub": [
                    "Packt"
                ],
                "oclcid": [
                    "(ocolc)1006894361",
                    "(ocolc)on1006894361"
                ],
                "edition": [
                    "Second edition, fully revised and updated."
                ],
                "seriestitle": [
                    "Expert Insight"
                ],
                "format": [
                    "book"
                ],
                "genre": [
                    "book"
                ],
                "ristype": [
                    "BOOK"
                ],
                "btitle": [
                    "Python machine learning : machine learning and deep learning with Python, scikit-learn, and TensorFlow"
                ]
            },
            "sort": {
                "title": [
                    "Python machine learning : machine learning and deep learning with Python, scikit-learn, and TensorFlow /"
                ],
                "author": [
                    "Raschka, Sebastian, author."
                ],
                "creationdate": [
                    "2017"
                ]
            },
            "facets": {
                "frbrtype": [
                    "6"
                ],
                "frbrgroupid": [
                    "9001679725359234003"
                ]
            }
        }
    },
    {
        "context": "L",
        "adaptor": "Local Search Engine",
        "@id": "https://na03.alma.exlibrisgroup.com/primaws/rest/pub/pnxs/L/9923501934403476",
        "pnx": {
            "display": {
                "source": [
                    "Alma"
                ],
                "type": [
                    "book"
                ],
                "language": [
                    "eng"
                ],
                "title": [
                    "Machine Learning Engineering on AWS : Build, Scale, and Secure Machine Learning Systems and MLOps Pipelines in Production."
                ],
                "format": [
                    "1 online resource (530 pages)"
                ],
                "identifier": [
                    "$$CLink to WorldCat$$V<a target=\"_blank\" href=\"http://www.worldcat.org/search?q=no:1348491798\">1348491798</a>;$$CLink to WorldCat$$V<a target=\"_blank\" href=\"http://www.worldcat.org/search?q=no:1349089411\">1349089411</a>;$$CISBN$$V9781523151516;$$CISBN$$V152315151X;$$CISBN$$V9781803231389;$$CISBN$$V1803231386"
                ],
                "creationdate": [
                    "2022"
                ],
                "creator": [
                    "Lat, Joshua Arvin.$$QLat, Joshua Arvin."
                ],
                "publisher": [
                    "Birmingham : Packt Publishing, Limited"
                ],
                "description": [
                    "Work seamlessly with production-ready machine learning systems and pipelines on AWS by addressing key pain points encountered in the ML life cycle Key Features Gain practical knowledge of managing ML workloads on AWS using Amazon SageMaker, Amazon EKS, and more Use container and serverless services to solve a variety of ML engineering requirements Design, build, and secure automated MLOps pipelines and workflows on AWS Book Description There is a growing need for professionals with experience in working on machine learning (ML) engineering requirements as well as those with knowledge of automating complex MLOps pipelines in the cloud. This book explores a variety of AWS services, such as Amazon Elastic Kubernetes Service, AWS Glue, AWS Lambda, Amazon Redshift, and AWS Lake Formation, which ML practitioners can leverage to meet various data engineering and ML engineering requirements in production. This machine learning book covers the essential concepts as well as step-by-step instructions that are designed to help you get a solid understanding of how to manage and secure ML workloads in the cloud. As you progress through the chapters, you'll discover how to use several container and serverless solutions when training and deploying TensorFlow and PyTorch deep learning models on AWS. You'll also delve into proven cost optimization techniques as well as data privacy and model privacy preservation strategies in detail as you explore best practices when using each AWS. By the end of this AWS book, you'll be able to build, scale, and secure your own ML systems and pipelines, which will give you the experience and confidence needed to architect custom solutions using a variety of AWS services for ML engineering requirements. What you will learn Find out how to train and deploy TensorFlow and PyTorch models on AWS Use containers and serverless services for ML engineering requirements Discover how to set up a serverless data warehouse and data lake on AWS Build automated end-to-end MLOps pipelines using a variety of services Use AWS Glue DataBrew and SageMaker Data Wrangler for data engineering Explore different solutions for deploying deep learning models on AWS Apply cost optimization techniques to ML environments and systems Preserve data privacy and model privacy using a variety of techniques Who this book is for This book is for machine learning engineers, data scientists, and AWS cloud engineers interested in working on production data engineering, machine learning engineering, and MLOps requirements using a variety of AWS services such as Amazon EC2, Amazon Elastic Kubernetes Service (EKS), Amazon SageMaker, AWS Glue, Amazon Redshift, AWS Lake Formation, and AWS Lambda -- all you need is an AWS account to get started. Prior knowledge of AWS, machine learning, and the Python programming language will help you to grasp the concepts covered in this book more effectively."
                ],
                "mms": [
                    "9923501934403476"
                ],
                "edition": [
                    "1st ed."
                ],
                "contents": [
                    "Cover -- Title Page -- Copyright and Credits -- Contributors -- Table of Contents -- Preface -- Part 1: Getting Started with Machine Learning Engineering on AWS -- Chapter 1: Introduction to  ML Engineering on AWS -- Technical requirements -- What is expected from ML engineers? -- How ML engineers can get the most out of AWS -- Essential prerequisites -- Creating the Cloud9 environment -- Increasing Cloud9's storage -- Installing the Python prerequisites -- Preparing the dataset -- Generating a synthetic dataset using a deep learning model -- Exploratory data analysis -- Train-test split -- Uploading the dataset to Amazon S3 -- AutoML with AutoGluon -- Setting up and installing AutoGluon -- Performing your first AutoGluon AutoML experiment -- Getting started with SageMaker and SageMaker Studio -- Onboarding with SageMaker Studio -- Adding a user to an existing SageMaker Domain -- No-code machine learning with SageMaker Canvas -- AutoML with SageMaker Autopilot -- Summary -- Further reading -- Chapter 2: Deep Learning AMIs -- Technical requirements -- Getting started with Deep Learning AMIs -- Launching an EC2 instance using a Deep Learning AMI -- Locating the framework-specific DLAMI -- Choosing the instance type -- Ensuring a default secure configuration -- Launching the instance and connecting to it using EC2 Instance Connect -- Downloading the sample dataset -- Training an ML model -- Loading and evaluating the model -- Cleaning up -- Understanding how AWS pricing works for EC2 instances -- Using multiple smaller instances to reduce the overall cost of running ML workloads -- Using spot instances to reduce the cost of running training jobs -- Summary -- Further reading -- Chapter 3: Deep Learning Containers -- Technical requirements -- Getting started with AWS Deep Learning Containers -- Essential prerequisites.",
                    "Preparing the Cloud9 environment -- Downloading the sample dataset -- Using AWS Deep Learning Containers to train an ML model -- Serverless ML deployment with Lambda's container image support -- Building the custom container image -- Testing the container image -- Pushing the container image to Amazon ECR -- Running ML predictions on AWS Lambda -- Completing and testing the serverless API setup -- Summary -- Further reading -- Part 2: Solving Data Engineering and Analysis Requirements -- Chapter 4: Serverless Data Management on AWS -- Technical requirements -- Getting started with serverless data management -- Preparing the essential prerequisites -- Opening a text editor on your local machine -- Creating an IAM user -- Creating a new VPC -- Uploading the dataset to S3 -- Running analytics at scale with Amazon Redshift Serverless -- Setting up a Redshift Serverless endpoint -- Opening Redshift query editor v2 -- Creating a table -- Loading data from S3 -- Querying the database -- Unloading data to S3 -- Setting up Lake Formation -- Creating a database -- Creating a table using an AWS Glue Crawler -- Using Amazon Athena to query data in Amazon S3 -- Setting up the query result location -- Running SQL queries using Athena -- Summary -- Further reading -- Chapter 5: Pragmatic Data Processing  and Analysis -- Technical requirements -- Getting started with data processing and analysis -- Preparing the essential prerequisites -- Downloading the Parquet file -- Preparing the S3 bucket -- Automating data preparation and analysis with AWS Glue DataBrew -- Creating a new dataset -- Creating and running a profile job -- Creating a project and configuring a recipe -- Creating and running a recipe job -- Verifying the results -- Preparing ML data with Amazon SageMaker Data Wrangler -- Accessing Data Wrangler -- Importing data -- Transforming the data.",
                    "Analyzing the data -- Exporting the data flow -- Turning off the resources -- Verifying the results -- Summary -- Further reading -- Part 3: Diving Deeper with Relevant Model Training and Deployment Solutions -- Chapter 6: SageMaker Training and Debugging Solutions -- Technical requirements -- Getting started with the SageMaker Python SDK -- Preparing the essential prerequisites -- Creating a service limit increase request -- Training an image classification model with the SageMaker Python SDK -- Creating a new Notebook in SageMaker Studio -- Downloading the training, validation, and test datasets -- Uploading the data to S3 -- Using the SageMaker Python SDK to train an ML model -- Using the %store magic to store data -- Using the SageMaker Python SDK to deploy an ML model -- Using the Debugger Insights Dashboard -- Utilizing Managed Spot Training and Checkpoints -- Cleaning up -- Summary -- Further reading -- Chapter 7: SageMaker Deployment Solutions -- Technical requirements -- Getting started with model deployments in SageMaker -- Preparing the pre-trained model artifacts -- Preparing the SageMaker script mode prerequisites -- Preparing the inference.py file -- Preparing the requirements.txt file -- Preparing the setup.py file -- Deploying a pre-trained model to a real-time inference endpoint -- Deploying a pre-trained model to a serverless inference endpoint -- Deploying a pre-trained model to an asynchronous inference endpoint -- Creating the input JSON file -- Adding an artificial delay to the inference script -- Deploying and testing an asynchronous inference endpoint -- Cleaning up -- Deployment strategies and best practices -- Summary -- Further reading -- Part 4: Securing, Monitoring, and Managing Machine Learning Systems and Environments -- Chapter 8: Model Monitoring and Management Solutions -- Technical prerequisites.",
                    "Registering models to SageMaker Model Registry -- Creating a new notebook in SageMaker Studio -- Registering models to SageMaker Model Registry using the boto3 library -- Deploying models from SageMaker Model Registry -- Enabling data capture and simulating predictions -- Scheduled monitoring with SageMaker Model Monitor -- Analyzing the captured data -- Deleting an endpoint with a monitoring schedule -- Cleaning up -- Summary -- Further reading -- Chapter 9: Security, Governance, and Compliance Strategies -- Managing the security and compliance of ML environments -- Authentication and authorization -- Network security -- Encryption at rest and in transit -- Managing compliance reports -- Vulnerability management -- Preserving data privacy and model privacy -- Federated Learning -- Differential Privacy -- Privacy-preserving machine learning -- Other solutions and options -- Establishing ML governance -- Lineage Tracking and reproducibility -- Model inventory -- Model validation -- ML explainability -- Bias detection -- Model monitoring -- Traceability, observability, and auditing -- Data quality analysis and reporting -- Data integrity management -- Summary -- Further reading -- Part 5: Designing and Building End-to-end MLOps Pipelines -- Chapter 10: Machine Learning Pipelines with Kubeflow on Amazon EKS -- Technical requirements -- Diving deeper into Kubeflow, Kubernetes, and EKS -- Preparing the essential prerequisites -- Preparing the IAM role for the EC2 instance of the Cloud9 environment -- Attaching the IAM role to the EC2 instance of the Cloud9 environment -- Updating the Cloud9 environment with the essential prerequisites -- Setting up Kubeflow on Amazon EKS -- Running our first Kubeflow pipeline -- Using the Kubeflow Pipelines SDK to build ML workflows -- Cleaning up -- Recommended strategies and best practices -- Summary -- Further reading.",
                    "Chapter 11: Machine Learning Pipelines with SageMaker Pipelines -- Technical requirements -- Diving deeper into SageMaker Pipelines -- Preparing the essential prerequisites -- Running our first pipeline with SageMaker Pipelines -- Defining and preparing our first ML pipeline -- Running our first ML pipeline -- Creating Lambda functions for deployment -- Preparing the Lambda function for deploying a model to a new endpoint -- Preparing the Lambda function for checking whether an endpoint exists -- Preparing the Lambda function for deploying a model to an existing endpoint -- Testing our ML inference endpoint -- Completing the end-to-end ML pipeline -- Defining and preparing the complete ML pipeline -- Running the complete ML pipeline -- Cleaning up -- Recommended strategies and best practices -- Summary -- Further reading -- Index -- Other Books You May Enjoy."
                ],
                "place": [
                    "Birmingham :"
                ],
                "version": [
                    "1"
                ],
                "lds07": [
                    "Machine learning",
                    "Amazon Web Services (Firm)"
                ],
                "subject": [
                    "Machine learning",
                    "Amazon Web Services (Firm)"
                ]
            },
            "control": {
                "sourcerecordid": [
                    "9923501934403476"
                ],
                "recordid": [
                    "alma9923501934403476"
                ],
                "sourceid": "alma",
                "originalsourceid": [
                    "(CKB)25201519300041"
                ],
                "sourcesystem": [
                    "CKB"
                ],
                "sourceformat": [
                    "MARC21"
                ],
                "score": [
                    0.0528928971
                ],
                "isDedup": false,
                "save_score": [
                    0.00184917575
                ]
            },
            "addata": {
                "aulast": [
                    "Lat"
                ],
                "aufirst": [
                    "Joshua Arvin."
                ],
                "auinit": [
                    "J"
                ],
                "au": [
                    "Lat, Joshua Arvin."
                ],
                "creatorfull": [
                    "$$NLat, Joshua Arvin.$$LLat$$FJoshua Arvin.$$Rauthor"
                ],
                "date": [
                    "2022"
                ],
                "isbn": [
                    "9781523151516",
                    "152315151X",
                    "9781803231389",
                    "1803231386",
                    "9781803247595",
                    "1803247592"
                ],
                "abstract": [
                    "Work seamlessly with production-ready machine learning systems and pipelines on AWS by addressing key pain points encountered in the ML life cycle Key Features Gain practical knowledge of managing ML workloads on AWS using Amazon SageMaker, Amazon EKS, and more Use container and serverless services to solve a variety of ML engineering requirements Design, build, and secure automated MLOps pipelines and workflows on AWS Book Description There is a growing need for professionals with experience in working on machine learning (ML) engineering requirements as well as those with knowledge of automating complex MLOps pipelines in the cloud. This book explores a variety of AWS services, such as Amazon Elastic Kubernetes Service, AWS Glue, AWS Lambda, Amazon Redshift, and AWS Lake Formation, which ML practitioners can leverage to meet various data engineering and ML engineering requirements in production. This machine learning book covers the essential concepts as well as step-by-step instructions that are designed to help you get a solid understanding of how to manage and secure ML workloads in the cloud. As you progress through the chapters, you'll discover how to use several container and serverless solutions when training and deploying TensorFlow and PyTorch deep learning models on AWS. You'll also delve into proven cost optimization techniques as well as data privacy and model privacy preservation strategies in detail as you explore best practices when using each AWS. By the end of this AWS book, you'll be able to build, scale, and secure your own ML systems and pipelines, which will give you the experience and confidence needed to architect custom solutions using a variety of AWS services for ML engineering requirements. What you will learn Find out how to train and deploy TensorFlow and PyTorch models on AWS Use containers and serverless services for ML engineering requirements Discover how to set up a serverless data warehouse and data lake on AWS Build automated end-to-end MLOps pipelines using a variety of services Use AWS Glue DataBrew and SageMaker Data Wrangler for data engineering Explore different solutions for deploying deep learning models on AWS Apply cost optimization techniques to ML environments and systems Preserve data privacy and model privacy using a variety of techniques Who this book is for This book is for machine learning engineers, data scientists, and AWS cloud engineers interested in working on production data engineering, machine learning engineering, and MLOps requirements using a variety of AWS services such as Amazon EC2, Amazon Elastic Kubernetes Service (EKS), Amazon SageMaker, AWS Glue, Amazon Redshift, AWS Lake Formation, and AWS Lambda -- all you need is an AWS account to get started. Prior knowledge of AWS, machine learning, and the Python programming language will help you to grasp the concepts covered in this book more effectively."
                ],
                "cop": [
                    "Birmingham"
                ],
                "pub": [
                    "Packt Publishing, Limited"
                ],
                "oclcid": [
                    "(ocolc)1348491798",
                    "(ocolc)1349089411",
                    "(ocolc-p)1349089411"
                ],
                "edition": [
                    "1st ed."
                ],
                "format": [
                    "book"
                ],
                "genre": [
                    "book"
                ],
                "ristype": [
                    "BOOK"
                ],
                "btitle": [
                    "Machine Learning Engineering on AWS : Build, Scale, and Secure Machine Learning Systems and MLOps Pipelines in Production."
                ]
            },
            "sort": {
                "title": [
                    "Machine Learning Engineering on AWS : Build, Scale, and Secure Machine Learning Systems and MLOps Pipelines in Production."
                ],
                "author": [
                    "Lat, Joshua Arvin."
                ],
                "creationdate": [
                    "2022"
                ]
            },
            "facets": {
                "frbrtype": [
                    "6"
                ],
                "frbrgroupid": [
                    "9061970427054322718"
                ]
            }
        }
    },
    {
        "context": "L",
        "adaptor": "Local Search Engine",
        "@id": "https://na03.alma.exlibrisgroup.com/primaws/rest/pub/pnxs/L/9923764865503476",
        "pnx": {
            "display": {
                "source": [
                    "Alma"
                ],
                "type": [
                    "book"
                ],
                "language": [
                    "eng"
                ],
                "title": [
                    "Machine Learning in 2D Materials Science "
                ],
                "format": [
                    "1 online resource (249 pages)"
                ],
                "identifier": [
                    "$$CLink to WorldCat$$V<a target=\"_blank\" href=\"http://www.worldcat.org/search?q=no:1399562802\">1399562802</a>;$$CISBN$$V9781000987447;$$CISBN$$V1000987442;$$CISBN$$V9781003132981;$$CISBN$$V1003132987;$$CISBN$$V9781000987430;$$CISBN$$V1000987434"
                ],
                "creationdate": [
                    "2023"
                ],
                "creator": [
                    "Chundi, Parvathi, author.$$QChundi, Parvathi"
                ],
                "publisher": [
                    "Boca Raton, FL : CRC Press"
                ],
                "description": [
                    "\"Data science and machine learning (ML) methods are increasingly being used to transform the way research is being conducted in materials science to enable new discoveries and design new materials. For any materials science researcher or student, it may be daunting to figure out if ML techniques are useful for them or if so, which ones are applicable in their individual contexts, and how to study the effectiveness of these methods systematically. Machine Learning in 2D Materials Science provides broad coverage of data science and ML fundamentals to 2D materials science researchers so that they can confidently leverage these techniques in their research projects. Offers introductory material in topics such as ML, data integration, and 2D materials. Provides in-depth coverage of current ML methods for validating 2D materials using both experimental and simulation data, researching and discovering new 2D materials, and enhancing ML methods with physical properties of materials. Discusses customized ML methods for 2D materials data and applications and high throughput data acquisition. Describes several case studies illustrating how ML approaches are currently leading innovations in the discovery, development, manufacturing, and deployment of 2D materials needed for strengthening industrial products. Gives future trends in ML for 2D materials, explainable AI, and dealing with extremely large and small diverse datasets. Offers Jupyter Notebooks and datasets for download. Aimed at materials science researchers, this book allows readers to quickly, yet thoroughly learn the ML and AI concepts needed to ascertain the applicability of 2D ML methods in their research\"-- Provided by publisher."
                ],
                "mms": [
                    "9923764865503476"
                ],
                "edition": [
                    "First edition."
                ],
                "contents": [
                    "Cover -- Half Title -- Title Page -- Copyright Page -- Table of Contents -- Chapter 1 Introduction to Machine Learning for Analyzing Material-Microbe Interactions -- 1.1 Introduction -- References -- Chapter 2 Introduction to 2D Materials -- 2.1 Classification of 2D Materials -- 2.2 Synthesis of 2D Materials -- 2.2.1 Top-Down Methods -- 2.2.2 Bottom-Up Methods -- 2.2.3 Layer Transfer Methods -- 2.3 Functionality of 2D Materials -- 2.3.1 Mechanical Properties -- 2.3.2 Electrical Properties -- 2.3.3 Optical Properties -- 2.4 Applications of 2D Materials -- References -- Chapter 3 An Overview of Machine Learning -- 3.1 Introduction -- 3.1.1 The Processing Pipeline of an ML Task -- 3.1.2 Data Integration -- 3.1.3 Data Preparation -- 3.1.4 Model Building -- 3.1.5 Model Evaluation -- 3.2 ML Algorithms -- 3.2.1 Bias and Variance -- 3.3 Unsupervised Learning -- 3.3.1 Cluster Analysis -- 3.3.2 Principal Component Analysis (PCA) -- 3.4 Supervised Learning -- 3.4.1 Regression -- 3.4.2 Classification -- 3.4.3 Supervised Learning Variants: Self-Supervised Learning -- 3.5 Deep Learning -- 3.5.1 Convolutional Neural Networks (CNNs) -- 3.6 Recurrent Neural Networks (RNN) -- References -- Chapter 4 Discovery of 2D Materials with Machine Learning -- 4.1 Introduction: High-Throughput Screening -- 4.2 ML Approaches for 2D Materials Research -- 4.2.1 Three ML Approaches for 2D Materials Research -- 4.2.2 A Summary of the Use of Machine Learning in 2D Materials Research -- 4.3 Prediction of 2D Material Properties Using Machine Learning -- 4.4 Application Machine Learning Approaches to Discover Novel 2D Materials -- 4.4.1 Predictions of Crystal Structure -- 4.4.2 Prediction of Components -- 4.5 Machine Learning for Miscellaneous Functions -- 4.6 Assessment of Common Challenges and Their Prevention Methods -- 4.6.1 The Problems with Model Building -- 4.6.2 Usability.",
                    "4.6.3 Learning Efficiency -- 4.7 Conclusions -- References -- Chapter 5 Bacterial Image Segmentation through Deep Learning Approach -- 5.1 Introduction -- 5.2 Literature Review and Related Work -- 5.2.1 Conventional Approaches for Semantic Segmentation -- 5.2.2 Contour-Based Methods -- 5.2.3 Ellipse-Fitting Methods -- 5.2.4 CNN-Based Approaches -- 5.3 Methodology -- 5.3.1 Data Collection -- 5.3.2 Image Preprocessing -- 5.3.3 ViTransUNet -- 5.4 Experimental Design and Results -- 5.4.1 Experimental Setup -- 5.4.2 Evaluation Metrics -- 5.4.3 Evaluation Results -- 5.5 Conclusion and Future Work -- References -- Chapter 6 Self-Supervised Learning-Based Classification of Scanning Electron Microscope Images of Biofilms -- 6.1 Introduction -- 6.2 Self-Supervised Learning for Image Analyses -- 6.2.1 Pretext Tasks -- 6.2.2 Downstream Tasks on Medical Imaging -- 6.3 Use of Super-Resolution to Address the Heterogeneity and Quality of SEM Biofilm Images -- 6.3.1 Methodology -- 6.3.2 Experimental Setup and Results -- 6.3.3 Summary -- 6.4 Classification of SEM Biofilms Using SSL -- 6.4.1 Dataset -- 6.4.2 Image Pre-Processing -- 6.4.3 Annotation, Patch Generation, and Object Masking -- 6.4.4 Self-Supervised Training -- 6.4.5 Downstream Task -- 6.4.6 Experiments -- 6.4.7 Evaluation -- 6.4.8 Results -- 6.4.9 Discussion -- 6.4.10 Summary -- 6.5 Conclusion -- Acknowledgements -- References -- Chapter 7 Quorum Sensing Mechanisms, Biofilm Growth, and Microbial Corrosion Effects of Bacterial Species -- Definitions -- Acronyms -- 7.1 Introduction -- 7.2 Quorum Sensing -- 7.3 Key Quorum Sensing Molecules and Their Signaling Mechanisms -- 7.4 Quorum Sensing in Relation to Stress Response -- 7.5 Background on Biofilms with Focus on Its Ecology in Natural Ecosystems -- 7.6 Quorum Sensing, Biofilm Growth, and Microbiologically Influenced Corrosion.",
                    "7.6.1 QS, Biofilm Growth, and MIC -- 7.6.2 Bioinformatics Analysis -- 7.7 Adhesion-Induced Emergent Properties in Biofilm -- 7.8 Methods to Inhibit Quorum Sensing -- 7.9 Conclusion -- Acknowledgments -- References -- Chapter 8 Data-Driven 2D Material Discovery Using Biofilm Data and Information Discovery System (Biofilm-DIDS) -- 8.1 Introduction -- 8.1.1 Microbial Community, Biofilm, and Material-Biofilm Interaction -- 8.1.2 Complex System Design: SDLC and Agile Methodology Meets Big Data -- 8.1.3 Big Data Mining and Knowledge Discovery -- 8.2 Interface between the Living and the Non-Living: a System Thinking Approach -- 8.2.1 System Understanding of Biointerface -- 8.2.2 Big Data in Biointerfaces -- 8.3 Biofilm-DIDS Overview -- 8.4 Using Biofilm-DIDS to Extract Biocorrosion Gene of Interest from the Literature and Material Dimension Prediction -- 8.4.1 Expert Informed Relevant Dataset Extraction from User Free Text Question -- 8.4.2 Downstream Analysis for Material Dimension Prediction -- 8.5 Conclusions -- Acknowledgments -- References -- Chapter 9 Machine Learning-Guided Optical and Raman Spectroscopy Characterization of 2D Materials -- 9.1 Introduction -- 9.2 Established Surface Characterization Techniques -- 9.3 ML-Guided Optical Detection of 2D Materials -- 9.4 ML-Guided Raman Spectroscopy Detection of 2D Materials -- 9.5 Common Challenges to ML in Raman Spectroscopy -- 9.6 Future Prospects -- 9.7 Summary -- References -- Chapter 10 Atomistic Experiments for Discovery of 2D Coatings: Biological Applications -- 10.1 Introduction -- 10.2 Molecular Dynamics (Algorithms and Methods) -- 10.2.1 Empirical Forcefields -- 10.2.2 Periodic Boundary Conditions -- 10.2.3 Binding Energy -- 10.2.4 Free Energy -- 10.2.5 Umbrella Sampling -- 10.2.6 Coarse-Grained Modeling -- 10.3 Employment of MD on Functional 2D Materials.",
                    "10.3.1 Graphene and Its Structural Defects -- 10.3.2 The Emergence of Bioinformatics: Applications and Methodologies -- 10.3.3 Current Trends in Biomolecular Simulation and Modeling -- 10.4 Machine Learning -- 10.4.1 ML Methods for 2D Materials -- 10.4.2 ML for Force Field Development and Parameterization -- 10.4.3 ML for Protein Structure Prediction -- 10.5 Summary -- References -- Chapter 11 Machine Learning for Materials Science: Emerging Research Areas -- 11.1 Introduction -- 11.2 Applications of ML in Materials Science -- 11.2.1 Additive Manufacturing -- 11.2.2 Combinatorial Synthesis and Machine Learning-Assisted Discovery of Thin Films -- 11.2.3 Machine Learning-Assisted Properties Prediction of Bulk Alloys -- 11.2.4 Design of Drug-Releasing Materials with Machine Learning -- 11.2.5 AI and ML Tools for Search and Discovery of Quantum Materials -- 11.3 Gaps and Barriers to Implementation -- References -- Chapter 12 The Future of Data Science in Materials Science -- 12.1 Introduction -- 12.2 Learning with Small Training Datasets -- 12.2.1 Data Augmentation -- 12.2.2 Semisupervised Learning -- 12.2.3 Transfer Learning -- 12.2.4 Few-Shot Learning -- 12.3 Physics-Inspired Neural Networks -- 12.4 Digital Twins -- 12.5 Data-Centric Artificial Intelligence -- 12.5.1 Data Collection -- 12.5.2 Robust and Fair Model Training -- 12.5.3 Continuous Learning -- 12.6 GPT Models -- 12.7 Future Directions in Using ML for 2D Materials -- References -- Index."
                ],
                "place": [
                    "Boca Raton, FL :"
                ],
                "version": [
                    "1"
                ],
                "lds07": [
                    "Materials science -- Data processing",
                    "Two-dimensional materials -- Computer simulation",
                    "Machine learning"
                ],
                "subject": [
                    "Materials science -- Data processing",
                    "Two-dimensional materials -- Computer simulation",
                    "Machine learning"
                ]
            },
            "control": {
                "sourcerecordid": [
                    "9923764865503476"
                ],
                "recordid": [
                    "alma9923764865503476"
                ],
                "sourceid": "alma",
                "originalsourceid": [
                    "(CKB)28285406800041"
                ],
                "sourcesystem": [
                    "EBC"
                ],
                "sourceformat": [
                    "MARC21"
                ],
                "score": [
                    0.052717051475
                ],
                "isDedup": false,
                "save_score": [
                    0.0016733301250000002
                ]
            },
            "addata": {
                "originatingSystemIDAuthor": [
                    "n2023036171"
                ],
                "aulast": [
                    "Chundi"
                ],
                "aufirst": [
                    "Parvathi"
                ],
                "auinit": [
                    "P"
                ],
                "au": [
                    "Chundi, Parvathi"
                ],
                "creatorfull": [
                    "$$NChundi, Parvathi$$LChundi$$FParvathi$$Rauthor"
                ],
                "date": [
                    "2023"
                ],
                "isbn": [
                    "9781000987447",
                    "1000987442",
                    "9781003132981",
                    "1003132987",
                    "9781000987430",
                    "1000987434",
                    "9780367678210",
                    "0367678217",
                    "9780367678203",
                    "0367678209"
                ],
                "abstract": [
                    "\"Data science and machine learning (ML) methods are increasingly being used to transform the way research is being conducted in materials science to enable new discoveries and design new materials. For any materials science researcher or student, it may be daunting to figure out if ML techniques are useful for them or if so, which ones are applicable in their individual contexts, and how to study the effectiveness of these methods systematically. Machine Learning in 2D Materials Science provides broad coverage of data science and ML fundamentals to 2D materials science researchers so that they can confidently leverage these techniques in their research projects. Offers introductory material in topics such as ML, data integration, and 2D materials. Provides in-depth coverage of current ML methods for validating 2D materials using both experimental and simulation data, researching and discovering new 2D materials, and enhancing ML methods with physical properties of materials. Discusses customized ML methods for 2D materials data and applications and high throughput data acquisition. Describes several case studies illustrating how ML approaches are currently leading innovations in the discovery, development, manufacturing, and deployment of 2D materials needed for strengthening industrial products. Gives future trends in ML for 2D materials, explainable AI, and dealing with extremely large and small diverse datasets. Offers Jupyter Notebooks and datasets for download. Aimed at materials science researchers, this book allows readers to quickly, yet thoroughly learn the ML and AI concepts needed to ascertain the applicability of 2D ML methods in their research\"-- Provided by publisher."
                ],
                "cop": [
                    "Boca Raton, FL"
                ],
                "pub": [
                    "CRC Press"
                ],
                "oclcid": [
                    "(ocolc)1399562802",
                    "(ocolc-p)1399562802"
                ],
                "doi": [
                    "10.1201/9781003132981"
                ],
                "edition": [
                    "First edition."
                ],
                "format": [
                    "book"
                ],
                "genre": [
                    "book"
                ],
                "ristype": [
                    "BOOK"
                ],
                "btitle": [
                    "Machine Learning in 2D Materials Science"
                ]
            },
            "sort": {
                "title": [
                    "Machine Learning in 2D Materials Science /"
                ],
                "author": [
                    "Chundi, Parvathi, author."
                ],
                "creationdate": [
                    "2023"
                ]
            },
            "facets": {
                "frbrtype": [
                    "6"
                ],
                "frbrgroupid": [
                    "9059194778805117770"
                ]
            }
        }
    },
    {
        "pnx": {
            "links": {
                "linktopdf": [
                    "$$Uhttps://login.libproxy.uregina.ca:8443/login?&url=https://dl.acm.org/doi/pdf/10.1145/3588433$$EPDF$$P50$$Gacm$$H"
                ],
                "openurlfulltext": [
                    "$$Topenurlfull_article"
                ],
                "openurl": [
                    "$$Topenurl_article"
                ],
                "thumbnail": [
                    "$$Tsyndetics_thumb_exl"
                ]
            },
            "search": {
                "description": [
                    "Data-driven algorithms are only as good as the data they work with, while datasets, especially social data, often fail to represent minorities adequately. Representation Bias in data can happen due to various reasons, ranging from historical discrimination to selection and sampling biases in the data acquisition and preparation methods. Given that “bias in, bias out,” one cannot expect AI-based solutions to have equitable outcomes for societal applications, without addressing issues such as representation bias. While there has been extensive study of fairness in machine learning models, including several review papers, bias in the data has been less studied. This article reviews the literature on identifying and resolving representation bias as a feature of a dataset, independent of how consumed later. The scope of this survey is bounded to structured (tabular) and unstructured (e.g., image, text, graph) data. It presents taxonomies to categorize the studied techniques based on multiple design dimensions and provides a side-by-side comparison of their properties.There is still a long way to fully address representation bias issues in data. The authors hope that this survey motivates researchers to approach these challenges in the future by observing existing work within their respective domains."
                ],
                "orcidid": [
                    "https://orcid.org/0000-0001-7016-3807",
                    "https://orcid.org/0000-0002-5251-6186",
                    "https://orcid.org/0000-0002-6609-5706",
                    "https://orcid.org/0000-0003-0724-5214"
                ],
                "creator": [
                    "Shahbazi, Nima",
                    "Lin, Yin",
                    "Asudeh, Abolfazl",
                    "Jagadish, H. V."
                ],
                "title": [
                    "Representation Bias in Data: A Survey on Identification and Resolution Techniques",
                    "ACM computing surveys"
                ],
                "subject": [
                    "Information storage and retrieval systems"
                ],
                "issn": [
                    "0360-0300",
                    "1557-7341"
                ],
                "fulltext": [
                    "true"
                ],
                "addtitle": [
                    "ACM CSUR"
                ],
                "general": [
                    "ACM"
                ],
                "startdate": [
                    "20231231"
                ],
                "enddate": [
                    "20231231"
                ],
                "recordtype": [
                    "article"
                ],
                "recordid": [
                    "eNo90L1PwzAQBXALgUQoiJ3JG1PgbF8Sm620fFSqhChljoxzEUZtWuwEqf89gRSm0-n99IbH2LmAKyEwu1aZ1qjUAUtElhVpoVAcsgRUDikogGN2EuMHAEgUecKeF7QNFKlpbes3Db_1NnLf8Klt7Q0f85cufNGO98ms6pGvvRugbSq-oLhZdb_vktx74z87iqfsqLarSGf7O2Kv93fLyWM6f3qYTcbz1ErENjVvTmk0GgWQljJHjZV1IHRek5FEtUEjEDLUlS5kUdhcClOjkS4z2oFWI3Y59LqwiTFQXW6DX9uwKwWUP0uU-yV6eTFI69b_6C_8BrcrVuQ"
                ],
                "scope": [
                    "AAYXX",
                    "CITATION"
                ],
                "creationdate": [
                    "2023"
                ],
                "creatorcontrib": [
                    "Shahbazi, Nima",
                    "Lin, Yin",
                    "Asudeh, Abolfazl",
                    "Jagadish, H. V."
                ],
                "rsrctype": [
                    "article"
                ]
            },
            "delivery": {
                "fulltext": [
                    "fulltext"
                ],
                "delcategory": [
                    "Remote Search Resource"
                ]
            },
            "display": {
                "description": [
                    "Data-driven algorithms are only as good as the data they work with, while datasets, especially social data, often fail to represent minorities adequately. Representation Bias in data can happen due to various reasons, ranging from historical discrimination to selection and sampling biases in the data acquisition and preparation methods. Given that “bias in, bias out,” one cannot expect AI-based solutions to have equitable outcomes for societal applications, without addressing issues such as representation bias. While there has been extensive study of fairness in machine learning models, including several review papers, bias in the data has been less studied. This article reviews the literature on identifying and resolving representation bias as a feature of a dataset, independent of how consumed later. The scope of this survey is bounded to structured (tabular) and unstructured (e.g., image, text, graph) data. It presents taxonomies to categorize the studied techniques based on multiple design dimensions and provides a side-by-side comparison of their properties.There is still a long way to fully address representation bias issues in data. The authors hope that this survey motivates researchers to approach these challenges in the future by observing existing work within their respective domains."
                ],
                "publisher": [
                    "New York, NY: ACM"
                ],
                "ispartof": [
                    "ACM computing surveys, 2023-12, Vol.55 (13s), p.1-39, Article 293"
                ],
                "identifier": [
                    "ISSN: 0360-0300",
                    "EISSN: 1557-7341",
                    "DOI: 10.1145/3588433"
                ],
                "rights": [
                    "Permission to make digital or hard copies of all or part of this work for personal or classroom use is granted without fee provided that copies are not made or distributed for profit or commercial advantage and that copies bear this notice and the full citation on the first page. Copyrights for components of this work owned by others than the author(s) must be honored. Abstracting with credit is permitted. To copy otherwise, or republish, to post on servers or to redistribute to lists, requires prior specific permission and/or a fee. Request permissions from"
                ],
                "snippet": [
                    ".... While there has been extensive study of fairness in machine learning models, including several review papers, bias in the data has been less studied..."
                ],
                "creator": [
                    "Shahbazi, Nima ; Lin, Yin ; Asudeh, Abolfazl ; Jagadish, H. V."
                ],
                "title": [
                    "Representation Bias in Data: A Survey on Identification and Resolution Techniques"
                ],
                "lds50": [
                    "peer_reviewed"
                ],
                "type": [
                    "article"
                ],
                "source": [
                    "ACM Digital Library Complete"
                ],
                "language": [
                    "eng"
                ],
                "subject": [
                    "Information storage and retrieval systems"
                ],
                "keyword": [
                    "Data management systems"
                ]
            },
            "facets": {
                "creationdate": [
                    "2023"
                ],
                "creatorcontrib": [
                    "Shahbazi, Nima",
                    "Lin, Yin",
                    "Asudeh, Abolfazl",
                    "Jagadish, H. V."
                ],
                "language": [
                    "eng"
                ],
                "toplevel": [
                    "peer_reviewed",
                    "online_resources"
                ],
                "frbrgroupid": [
                    "cdi_FETCH-LOGICAL-a244t-9bc38498410e8226484dac0186fe92eef949140548d87277a6219f492c598c083"
                ],
                "frbrtype": [
                    "5"
                ],
                "jtitle": [
                    "ACM computing surveys"
                ],
                "topic": [
                    "Information storage and retrieval systems"
                ],
                "prefilter": [
                    "articles"
                ],
                "rsrctype": [
                    "articles"
                ],
                "collection": [
                    "CrossRef"
                ]
            },
            "addata": {
                "format": [
                    "journal"
                ],
                "ristype": [
                    "JOUR"
                ],
                "cop": [
                    "New York, NY"
                ],
                "pub": [
                    "ACM"
                ],
                "doi": [
                    "10.1145/3588433"
                ],
                "tpages": [
                    "39"
                ],
                "au": [
                    "Shahbazi, Nima",
                    "Lin, Yin",
                    "Asudeh, Abolfazl",
                    "Jagadish, H. V."
                ],
                "atitle": [
                    "Representation Bias in Data: A Survey on Identification and Resolution Techniques"
                ],
                "stitle": [
                    "ACM CSUR"
                ],
                "date": [
                    "2023-12-31"
                ],
                "risdate": [
                    "2023"
                ],
                "volume": [
                    "55"
                ],
                "issue": [
                    "13s"
                ],
                "spage": [
                    "1"
                ],
                "epage": [
                    "39"
                ],
                "pages": [
                    "1-39"
                ],
                "artnum": [
                    "293"
                ],
                "eissn": [
                    "1557-7341"
                ],
                "orcidid": [
                    "https://orcid.org/0000-0001-7016-3807",
                    "https://orcid.org/0000-0002-5251-6186",
                    "https://orcid.org/0000-0002-6609-5706",
                    "https://orcid.org/0000-0003-0724-5214"
                ],
                "issn": [
                    "0360-0300"
                ],
                "abstract": [
                    "Data-driven algorithms are only as good as the data they work with, while datasets, especially social data, often fail to represent minorities adequately. Representation Bias in data can happen due to various reasons, ranging from historical discrimination to selection and sampling biases in the data acquisition and preparation methods. Given that “bias in, bias out,” one cannot expect AI-based solutions to have equitable outcomes for societal applications, without addressing issues such as representation bias. While there has been extensive study of fairness in machine learning models, including several review papers, bias in the data has been less studied. This article reviews the literature on identifying and resolving representation bias as a feature of a dataset, independent of how consumed later. The scope of this survey is bounded to structured (tabular) and unstructured (e.g., image, text, graph) data. It presents taxonomies to categorize the studied techniques based on multiple design dimensions and provides a side-by-side comparison of their properties.There is still a long way to fully address representation bias issues in data. The authors hope that this survey motivates researchers to approach these challenges in the future by observing existing work within their respective domains."
                ],
                "jtitle": [
                    "ACM computing surveys"
                ],
                "genre": [
                    "article"
                ]
            },
            "sort": {
                "title": [
                    "Representation Bias in Data: A Survey on Identification and Resolution Techniques"
                ],
                "creationdate": [
                    "20231231"
                ],
                "author": [
                    "Shahbazi, Nima ; Lin, Yin ; Asudeh, Abolfazl ; Jagadish, H. V."
                ]
            },
            "control": {
                "iscdi": [
                    "true"
                ],
                "recordtype": [
                    "article"
                ],
                "sourceid": [
                    "acm_cross"
                ],
                "recordid": [
                    "cdi_crossref_primary_10_1145_3588433"
                ],
                "addsrcrecordid": [
                    "eNo90L1PwzAQBXALgUQoiJ3JG1PgbF8Sm620fFSqhChljoxzEUZtWuwEqf89gRSm0-n99IbH2LmAKyEwu1aZ1qjUAUtElhVpoVAcsgRUDikogGN2EuMHAEgUecKeF7QNFKlpbes3Db_1NnLf8Klt7Q0f85cufNGO98ms6pGvvRugbSq-oLhZdb_vktx74z87iqfsqLarSGf7O2Kv93fLyWM6f3qYTcbz1ErENjVvTmk0GgWQljJHjZV1IHRek5FEtUEjEDLUlS5kUdhcClOjkS4z2oFWI3Y59LqwiTFQXW6DX9uwKwWUP0uU-yV6eTFI69b_6C_8BrcrVuQ"
                ],
                "sourcerecordid": [
                    "3588433"
                ],
                "originalsourceid": [
                    "FETCH-LOGICAL-a244t-9bc38498410e8226484dac0186fe92eef949140548d87277a6219f492c598c083"
                ],
                "sourcetype": [
                    "Aggregation Database"
                ],
                "sourceformat": [
                    "XML"
                ],
                "sourcesystem": [
                    "Other"
                ],
                "score": [
                    "0.050415557"
                ]
            }
        },
        "delivery": {
            "link": [],
            "deliveryCategory": [
                "Remote Search Resource"
            ],
            "availability": [
                "fulltext"
            ],
            "displayLocation": false,
            "additionalLocations": false,
            "physicalItemTextCodes": "",
            "feDisplayOtherLocations": false,
            "displayedAvailability": "true",
            "holding": [],
            "almaOpenurl": "https://na03.alma.exlibrisgroup.com/view/uresolver/01CASLS_REGINA/openurl?ctx_enc=info:ofi/enc:UTF-8&ctx_id=10_1&ctx_tim=2025-03-06 17:37:06&ctx_ver=Z39.88-2004&url_ctx_fmt=info:ofi/fmt:kev:mtx:ctx&url_ver=Z39.88-2004&rfr_id=info:sid/primo.exlibrisgroup.com-acm_cross&rft_val_fmt=info:ofi/fmt:kev:mtx:journal&rft.genre=article&rft.atitle=Representation+Bias+in+Data%3A+A+Survey+on+Identification+and+Resolution+Techniques&rft.jtitle=ACM+computing+surveys&rft.au=Shahbazi%2C+Nima&rft.date=2023-12-31&rft.volume=55&rft.issue=13s&rft.spage=1&rft.epage=39&rft.pages=1-39&rft.artnum=293&rft.issn=0360-0300&rft.eissn=1557-7341&rft_id=info:doi/10.1145%2F3588433&rft.pub=ACM&rft.place=New+York%2C+NY&rft.stitle=ACM+CSUR&rft_dat=<acm_cross>3588433</acm_cross>&svc_dat=viewit"
        },
        "context": "PC",
        "adaptor": "Primo Central",
        "extras": {
            "citationTrails": {
                "citing": [
                    "FETCH-LOGICAL-a244t-9bc38498410e8226484dac0186fe92eef949140548d87277a6219f492c598c083"
                ],
                "citedby": [
                    "FETCH-LOGICAL-a244t-9bc38498410e8226484dac0186fe92eef949140548d87277a6219f492c598c083"
                ]
            },
            "timesCited": {}
        },
        "@id": "https://na03.alma.exlibrisgroup.com/primaws/rest/pub/pnxs/PC/cdi_crossref_primary_10_1145_3588433"
    },
    {
        "pnx": {
            "links": {
                "linktohtml": [
                    "$$Uhttps://www.sciencedirect.com/science/article/pii/S0957417424032111$$EHTML$$P50$$Gelsevier$$Hfree_for_read"
                ],
                "openurlfulltext": [
                    "$$Topenurlfull_article"
                ],
                "openurl": [
                    "$$Topenurl_article"
                ],
                "thumbnail": [
                    "$$Tsyndetics_thumb_exl"
                ]
            },
            "search": {
                "description": [
                    "Addressing bias and unfairness in machine learning models in different application domains is a multifaceted challenge. Despite the variety of fairness metrics available, identifying an optimal set for evaluating a model’s fairness is still an open question due to the diverse nature of these metrics and the lack of a comprehensive approach for ensuring fairness across different applications. This study aims to propose a method that allows the selection of the most representative metrics for bias and fairness assessment, in post-processing for machine learning models in different contexts. We delve into the use of a correlation-based strategy as a heuristic for fairness metric selection, applying bootstrap sampling using the Markov chain Monte Carlo technique, with our proposed improvements, including stratified sampling, stopping criterion, and Kendall correlation, to address the data bias representation, the computational cost, and the robustness, respectively. An average decrease of 64.37% in the number of models and of 20.00% in processing time was achieved. Moreover, the proposed method effectively paired metrics with similar behaviour, highlighting the presence of a similar term as a strong indicator of a direct relationship. While no standout metric emerges across all contexts, within specific models or datasets, certain metrics consistently stand out. In a complex scenario using a large language model for sexism detection, the proposed method achieved a 71.93% reduction in execution time while forming more comprehensive metric groups. Overall, the proposed method successfully selects the representative metric with a considerable gain in computational costs, demonstrating its practicality for real-world applications.\n[Display omitted]\n•Validate correlation for finding a representative fairness metric in a context.•Reduce the computational power needed to find the representative metrics.•Validate the method empirically, showing effectiveness across models and datasets.•Analyse fairness metrics context relations and dependencies."
                ],
                "orcidid": [
                    "https://orcid.org/0000-0003-2219-0290",
                    "https://orcid.org/0000-0001-5203-2408",
                    "https://orcid.org/0000-0002-3160-3571",
                    "https://orcid.org/0000-0002-2404-0643",
                    "https://orcid.org/0000-0002-9393-857X",
                    "https://orcid.org/0000-0001-6505-6636",
                    "https://orcid.org/0000-0003-2457-9064"
                ],
                "creator": [
                    "Loureiro, Rafael B.",
                    "Pagano, Tiago P.",
                    "Lisboa, Fernanda V.N.",
                    "Nascimento, Lian F.S.",
                    "Oliveira, Ewerton L.S.",
                    "Winkler, Ingrid",
                    "Nascimento, Erick G. Sperandio"
                ],
                "title": [
                    "Correlation-based methods for representative fairness metric selection: An empirical study on efficiency and caveats in model evaluation",
                    "Expert systems with applications"
                ],
                "subject": [
                    "Bias"
                ],
                "issn": [
                    "0957-4174"
                ],
                "fulltext": [
                    "true"
                ],
                "general": [
                    "Elsevier Ltd"
                ],
                "startdate": [
                    "20250405"
                ],
                "enddate": [
                    "20250405"
                ],
                "recordtype": [
                    "article"
                ],
                "recordid": [
                    "eNp9kMlOwzAQhn0AiVJ4AU5-gQRviRPEparYpEpc4GxN7bFwlaWy06C-AY9N0nLmNNKv-Wb5CLnjLOeMl_e7HNM35IIJlXNRSqUuyILVhc4U1-qKXKe0Y4xrxvSC_Kz7GLGBIfRdtoWEjrY4fPUuUd9HGnEfMWE3TA0jUg8hdpjS3BODpQkbtDP6QFcdxXYfphQamoaDO9J-irwPNmBnjxQ6Ry2MCEOioaNt77ChOEJzOC2_IZcemoS3f3VJPp-fPtav2eb95W292mRWiGLIUMtCSdDVVkuJCFpUpS-LErS3QhYSlSuruva-1morRAWSayuYY-AZuErKJRHnuTb2KUX0Zh9DC_FoODOzP7Mzsz8z-zNnfxP0eIZwumwMGE06fYUuxEmAcX34D_8FqoB-1w"
                ],
                "scope": [
                    "6I.",
                    "AAFTH",
                    "AAYXX",
                    "CITATION"
                ],
                "creationdate": [
                    "2025"
                ],
                "creatorcontrib": [
                    "Loureiro, Rafael B.",
                    "Pagano, Tiago P.",
                    "Lisboa, Fernanda V.N.",
                    "Nascimento, Lian F.S.",
                    "Oliveira, Ewerton L.S.",
                    "Winkler, Ingrid",
                    "Nascimento, Erick G. Sperandio"
                ],
                "rsrctype": [
                    "article"
                ]
            },
            "delivery": {
                "fulltext": [
                    "fulltext"
                ],
                "delcategory": [
                    "Remote Search Resource"
                ]
            },
            "display": {
                "description": [
                    "Addressing bias and unfairness in machine learning models in different application domains is a multifaceted challenge. Despite the variety of fairness metrics available, identifying an optimal set for evaluating a model’s fairness is still an open question due to the diverse nature of these metrics and the lack of a comprehensive approach for ensuring fairness across different applications. This study aims to propose a method that allows the selection of the most representative metrics for bias and fairness assessment, in post-processing for machine learning models in different contexts. We delve into the use of a correlation-based strategy as a heuristic for fairness metric selection, applying bootstrap sampling using the Markov chain Monte Carlo technique, with our proposed improvements, including stratified sampling, stopping criterion, and Kendall correlation, to address the data bias representation, the computational cost, and the robustness, respectively. An average decrease of 64.37% in the number of models and of 20.00% in processing time was achieved. Moreover, the proposed method effectively paired metrics with similar behaviour, highlighting the presence of a similar term as a strong indicator of a direct relationship. While no standout metric emerges across all contexts, within specific models or datasets, certain metrics consistently stand out. In a complex scenario using a large language model for sexism detection, the proposed method achieved a 71.93% reduction in execution time while forming more comprehensive metric groups. Overall, the proposed method successfully selects the representative metric with a considerable gain in computational costs, demonstrating its practicality for real-world applications.\n[Display omitted]\n•Validate correlation for finding a representative fairness metric in a context.•Reduce the computational power needed to find the representative metrics.•Validate the method empirically, showing effectiveness across models and datasets.•Analyse fairness metrics context relations and dependencies."
                ],
                "publisher": [
                    "Elsevier Ltd"
                ],
                "ispartof": [
                    "Expert systems with applications, 2025-04, Vol.268, p.126344, Article 126344"
                ],
                "identifier": [
                    "ISSN: 0957-4174",
                    "DOI: 10.1016/j.eswa.2024.126344"
                ],
                "rights": [
                    "2025 The Authors"
                ],
                "snippet": [
                    "Addressing bias and unfairness in machine learning models in different application domains is a multifaceted challenge..."
                ],
                "creator": [
                    "Loureiro, Rafael B. ; Pagano, Tiago P. ; Lisboa, Fernanda V.N. ; Nascimento, Lian F.S. ; Oliveira, Ewerton L.S. ; Winkler, Ingrid ; Nascimento, Erick G. Sperandio"
                ],
                "title": [
                    "Correlation-based methods for representative fairness metric selection: An empirical study on efficiency and caveats in model evaluation"
                ],
                "lds50": [
                    "peer_reviewed"
                ],
                "type": [
                    "article"
                ],
                "source": [
                    "Elsevier ScienceDirect Journals Complete"
                ],
                "language": [
                    "eng"
                ],
                "oa": [
                    "free_for_read"
                ],
                "subject": [
                    "Bias"
                ],
                "keyword": [
                    "Correlation ;  Representative metric ;  Unfairness"
                ]
            },
            "facets": {
                "creationdate": [
                    "2025"
                ],
                "creatorcontrib": [
                    "Loureiro, Rafael B.",
                    "Pagano, Tiago P.",
                    "Lisboa, Fernanda V.N.",
                    "Nascimento, Lian F.S.",
                    "Oliveira, Ewerton L.S.",
                    "Winkler, Ingrid",
                    "Nascimento, Erick G. Sperandio"
                ],
                "language": [
                    "eng"
                ],
                "toplevel": [
                    "peer_reviewed",
                    "online_resources"
                ],
                "frbrgroupid": [
                    "cdi_FETCH-LOGICAL-c225t-e73543a78b733eea7286f656a7fc2353e4d6899ff974b228a317c20d0af0ad833"
                ],
                "frbrtype": [
                    "5"
                ],
                "jtitle": [
                    "Expert systems with applications"
                ],
                "topic": [
                    "Bias"
                ],
                "prefilter": [
                    "articles"
                ],
                "rsrctype": [
                    "articles"
                ],
                "collection": [
                    "ScienceDirect Open Access Titles",
                    "Elsevier:ScienceDirect:Open Access",
                    "CrossRef"
                ]
            },
            "addata": {
                "format": [
                    "journal"
                ],
                "ristype": [
                    "JOUR"
                ],
                "pub": [
                    "Elsevier Ltd"
                ],
                "doi": [
                    "10.1016/j.eswa.2024.126344"
                ],
                "au": [
                    "Loureiro, Rafael B.",
                    "Pagano, Tiago P.",
                    "Lisboa, Fernanda V.N.",
                    "Nascimento, Lian F.S.",
                    "Oliveira, Ewerton L.S.",
                    "Winkler, Ingrid",
                    "Nascimento, Erick G. Sperandio"
                ],
                "atitle": [
                    "Correlation-based methods for representative fairness metric selection: An empirical study on efficiency and caveats in model evaluation"
                ],
                "date": [
                    "2025-04-05"
                ],
                "risdate": [
                    "2025"
                ],
                "volume": [
                    "268"
                ],
                "spage": [
                    "126344"
                ],
                "pages": [
                    "126344-"
                ],
                "artnum": [
                    "126344"
                ],
                "orcidid": [
                    "https://orcid.org/0000-0003-2219-0290",
                    "https://orcid.org/0000-0001-5203-2408",
                    "https://orcid.org/0000-0002-3160-3571",
                    "https://orcid.org/0000-0002-2404-0643",
                    "https://orcid.org/0000-0002-9393-857X",
                    "https://orcid.org/0000-0001-6505-6636",
                    "https://orcid.org/0000-0003-2457-9064"
                ],
                "issn": [
                    "0957-4174"
                ],
                "abstract": [
                    "Addressing bias and unfairness in machine learning models in different application domains is a multifaceted challenge. Despite the variety of fairness metrics available, identifying an optimal set for evaluating a model’s fairness is still an open question due to the diverse nature of these metrics and the lack of a comprehensive approach for ensuring fairness across different applications. This study aims to propose a method that allows the selection of the most representative metrics for bias and fairness assessment, in post-processing for machine learning models in different contexts. We delve into the use of a correlation-based strategy as a heuristic for fairness metric selection, applying bootstrap sampling using the Markov chain Monte Carlo technique, with our proposed improvements, including stratified sampling, stopping criterion, and Kendall correlation, to address the data bias representation, the computational cost, and the robustness, respectively. An average decrease of 64.37% in the number of models and of 20.00% in processing time was achieved. Moreover, the proposed method effectively paired metrics with similar behaviour, highlighting the presence of a similar term as a strong indicator of a direct relationship. While no standout metric emerges across all contexts, within specific models or datasets, certain metrics consistently stand out. In a complex scenario using a large language model for sexism detection, the proposed method achieved a 71.93% reduction in execution time while forming more comprehensive metric groups. Overall, the proposed method successfully selects the representative metric with a considerable gain in computational costs, demonstrating its practicality for real-world applications.\n[Display omitted]\n•Validate correlation for finding a representative fairness metric in a context.•Reduce the computational power needed to find the representative metrics.•Validate the method empirically, showing effectiveness across models and datasets.•Analyse fairness metrics context relations and dependencies."
                ],
                "jtitle": [
                    "Expert systems with applications"
                ],
                "genre": [
                    "article"
                ],
                "oa": [
                    "free_for_read"
                ]
            },
            "sort": {
                "title": [
                    "Correlation-based methods for representative fairness metric selection: An empirical study on efficiency and caveats in model evaluation"
                ],
                "creationdate": [
                    "20250405"
                ],
                "author": [
                    "Loureiro, Rafael B. ; Pagano, Tiago P. ; Lisboa, Fernanda V.N. ; Nascimento, Lian F.S. ; Oliveira, Ewerton L.S. ; Winkler, Ingrid ; Nascimento, Erick G. Sperandio"
                ]
            },
            "control": {
                "iscdi": [
                    "true"
                ],
                "elsid": [
                    "S0957417424032111"
                ],
                "recordtype": [
                    "article"
                ],
                "sourceid": [
                    "elsevier_cross"
                ],
                "recordid": [
                    "cdi_crossref_primary_10_1016_j_eswa_2024_126344"
                ],
                "addsrcrecordid": [
                    "eNp9kMlOwzAQhn0AiVJ4AU5-gQRviRPEparYpEpc4GxN7bFwlaWy06C-AY9N0nLmNNKv-Wb5CLnjLOeMl_e7HNM35IIJlXNRSqUuyILVhc4U1-qKXKe0Y4xrxvSC_Kz7GLGBIfRdtoWEjrY4fPUuUd9HGnEfMWE3TA0jUg8hdpjS3BODpQkbtDP6QFcdxXYfphQamoaDO9J-irwPNmBnjxQ6Ry2MCEOioaNt77ChOEJzOC2_IZcemoS3f3VJPp-fPtav2eb95W292mRWiGLIUMtCSdDVVkuJCFpUpS-LErS3QhYSlSuruva-1morRAWSayuYY-AZuErKJRHnuTb2KUX0Zh9DC_FoODOzP7Mzsz8z-zNnfxP0eIZwumwMGE06fYUuxEmAcX34D_8FqoB-1w"
                ],
                "sourcerecordid": [
                    "S0957417424032111"
                ],
                "originalsourceid": [
                    "FETCH-LOGICAL-c225t-e73543a78b733eea7286f656a7fc2353e4d6899ff974b228a317c20d0af0ad833"
                ],
                "sourcetype": [
                    "Aggregation Database"
                ],
                "sourceformat": [
                    "XML"
                ],
                "sourcesystem": [
                    "Other"
                ],
                "score": [
                    "0.04825814"
                ]
            }
        },
        "delivery": {
            "link": [],
            "deliveryCategory": [
                "Remote Search Resource"
            ],
            "availability": [
                "fulltext"
            ],
            "displayLocation": false,
            "additionalLocations": false,
            "physicalItemTextCodes": "",
            "feDisplayOtherLocations": false,
            "displayedAvailability": "true",
            "holding": [],
            "almaOpenurl": "https://na03.alma.exlibrisgroup.com/view/uresolver/01CASLS_REGINA/openurl?ctx_enc=info:ofi/enc:UTF-8&ctx_id=10_1&ctx_tim=2025-03-06 17:37:06&ctx_ver=Z39.88-2004&url_ctx_fmt=info:ofi/fmt:kev:mtx:ctx&url_ver=Z39.88-2004&rfr_id=info:sid/primo.exlibrisgroup.com-elsevier_cross&rft_val_fmt=info:ofi/fmt:kev:mtx:journal&rft.genre=article&rft.atitle=Correlation-based+methods+for+representative+fairness+metric+selection%3A+An+empirical+study+on+efficiency+and+caveats+in+model+evaluation&rft.jtitle=Expert+systems+with+applications&rft.au=Loureiro%2C+Rafael+B.&rft.date=2025-04-05&rft.volume=268&rft.spage=126344&rft.pages=126344-&rft.artnum=126344&rft.issn=0957-4174&rft_id=info:doi/10.1016%2Fj.eswa.2024.126344&rft.pub=Elsevier+Ltd&rft_dat=<elsevier_cross>S0957417424032111</elsevier_cross>&svc_dat=viewit"
        },
        "context": "PC",
        "adaptor": "Primo Central",
        "extras": {
            "citationTrails": {
                "citing": [
                    "FETCH-LOGICAL-c225t-e73543a78b733eea7286f656a7fc2353e4d6899ff974b228a317c20d0af0ad833"
                ],
                "citedby": []
            },
            "timesCited": {}
        },
        "@id": "https://na03.alma.exlibrisgroup.com/primaws/rest/pub/pnxs/PC/cdi_crossref_primary_10_1016_j_eswa_2024_126344"
    },
    {
        "pnx": {
            "links": {
                "linktopdf": [
                    "$$Uhttps://login.libproxy.uregina.ca:8443/login?&url=https://onlinelibrary.wiley.com/doi/pdf/10.1002%2Fjae.3029$$EPDF$$P50$$Gwiley$$H"
                ],
                "linktohtml": [
                    "$$Uhttps://login.libproxy.uregina.ca:8443/login?&url=https://onlinelibrary.wiley.com/doi/full/10.1002%2Fjae.3029$$EHTML$$P50$$Gwiley$$H"
                ],
                "openurlfulltext": [
                    "$$Topenurlfull_article"
                ],
                "openurl": [
                    "$$Topenurl_article"
                ],
                "thumbnail": [
                    "$$Tsyndetics_thumb_exl"
                ]
            },
            "search": {
                "description": [
                    "Summary\nWe study approaches for adjusting machine learning methods when the training sample differs from the prediction sample on unobserved dimensions. The machine learning literature predominately assumes selection only on observed dimensions. Common approaches are to weight or include variables that influence selection as solutions to selection on observables. Simulation results show that selection on unobservables increases mean squared prediction error using popular machine‐learning algorithms. Common machine learning practices such as weighting or including variables that influence selection into the training or prediction sample often worsen sample selection bias. We propose two control function approaches that remove the effects of selection bias before training and find that they reduce mean‐squared prediction error in simulations. We apply these approaches to predicting the vote share of the incumbent in gubernatorial elections using previously observed re‐election bids. We find that ignoring selection on unobservables leads to substantially higher predicted vote shares for the incumbent than when the control function approach is used."
                ],
                "creator": [
                    "Brewer, Dylan",
                    "Carlson, Alyssa"
                ],
                "title": [
                    "Addressing sample selection bias for machine learning methods",
                    "Journal of applied econometrics (Chichester, England)"
                ],
                "subject": [
                    "Algorithms",
                    "Bias",
                    "Econometrics",
                    "Elections",
                    "Machine learning",
                    "Prophecies",
                    "Selection Bias",
                    "Voting"
                ],
                "issn": [
                    "0883-7252",
                    "1099-1255"
                ],
                "fulltext": [
                    "true"
                ],
                "general": [
                    "Wiley Periodicals Inc"
                ],
                "startdate": [
                    "202404"
                ],
                "enddate": [
                    "202404"
                ],
                "recordtype": [
                    "article"
                ],
                "recordid": [
                    "eNp10EtLw0AQwPFFFKxV8CMEvHhJnX0kmz14KKX1QcGLnpd9TGxCHnU3RfrtTaxXT3P5MTP8CbmlsKAA7KE2uODA1BmZUVAqpSzLzskMioKnkmXsklzFWANADiBn5HHpfcAYq-4ziabdN5hEbNANVd8ltjIxKfuQtMbtqg6TBk3oJtrisOt9vCYXpWki3vzNOfnYrN9Xz-n27elltdymjguh0lIioC-sFxZprrhlQHkJmOeitGjHb1FYahRwZx3zIrOSGiick545kILPyd1p7z70XweMg677Q-jGk5oDz5jiSshR3Z-UC32MAUu9D1VrwlFT0FMcPcbRU5yRpif6XTV4_Nfp1-X61_8AB35k_Q"
                ],
                "scope": [
                    "AAYXX",
                    "CITATION",
                    "8BJ",
                    "FQK",
                    "JBE",
                    "JQ2"
                ],
                "creationdate": [
                    "2024"
                ],
                "creatorcontrib": [
                    "Brewer, Dylan",
                    "Carlson, Alyssa"
                ],
                "rsrctype": [
                    "article"
                ]
            },
            "delivery": {
                "fulltext": [
                    "fulltext"
                ],
                "delcategory": [
                    "Remote Search Resource"
                ]
            },
            "display": {
                "description": [
                    "Summary\nWe study approaches for adjusting machine learning methods when the training sample differs from the prediction sample on unobserved dimensions. The machine learning literature predominately assumes selection only on observed dimensions. Common approaches are to weight or include variables that influence selection as solutions to selection on observables. Simulation results show that selection on unobservables increases mean squared prediction error using popular machine‐learning algorithms. Common machine learning practices such as weighting or including variables that influence selection into the training or prediction sample often worsen sample selection bias. We propose two control function approaches that remove the effects of selection bias before training and find that they reduce mean‐squared prediction error in simulations. We apply these approaches to predicting the vote share of the incumbent in gubernatorial elections using previously observed re‐election bids. We find that ignoring selection on unobservables leads to substantially higher predicted vote shares for the incumbent than when the control function approach is used."
                ],
                "publisher": [
                    "Chichester: Wiley Periodicals Inc"
                ],
                "ispartof": [
                    "Journal of applied econometrics (Chichester, England), 2024-04, Vol.39 (3), p.383-400"
                ],
                "identifier": [
                    "ISSN: 0883-7252",
                    "EISSN: 1099-1255",
                    "DOI: 10.1002/jae.3029"
                ],
                "rights": [
                    "2024 John Wiley & Sons, Ltd."
                ],
                "snippet": [
                    ".... Common machine learning practices such as weighting or including variables that influence selection into the training or prediction sample often worsen sample selection bias..."
                ],
                "creator": [
                    "Brewer, Dylan ; Carlson, Alyssa"
                ],
                "title": [
                    "Addressing sample selection bias for machine learning methods"
                ],
                "lds50": [
                    "peer_reviewed"
                ],
                "type": [
                    "article"
                ],
                "source": [
                    "Wiley Online Library All Journals"
                ],
                "language": [
                    "eng"
                ],
                "subject": [
                    "Algorithms ;  Bias ;  Econometrics ;  Elections ;  Machine learning ;  Prophecies ;  Selection Bias ;  Voting"
                ],
                "keyword": [
                    "control function ;  Election results ;  Incumbency ;  inverse probability weighting ;  sample selection ;  Simulation ;  State elections ;  Weighting"
                ]
            },
            "facets": {
                "creationdate": [
                    "2024"
                ],
                "creatorcontrib": [
                    "Brewer, Dylan",
                    "Carlson, Alyssa"
                ],
                "language": [
                    "eng"
                ],
                "toplevel": [
                    "peer_reviewed",
                    "online_resources"
                ],
                "frbrgroupid": [
                    "cdi_FETCH-LOGICAL-c3449-f7e0ed8bd4be1693b2013f0e664fbeb029e4b1a903cbc2d45b71a08cc7d2c0743"
                ],
                "frbrtype": [
                    "5"
                ],
                "jtitle": [
                    "Journal of applied econometrics (Chichester, England)"
                ],
                "topic": [
                    "Algorithms",
                    "Bias",
                    "Econometrics",
                    "Elections",
                    "Machine learning",
                    "Prophecies",
                    "Selection Bias",
                    "Voting"
                ],
                "prefilter": [
                    "articles"
                ],
                "rsrctype": [
                    "articles"
                ],
                "collection": [
                    "CrossRef",
                    "International Bibliography of the Social Sciences (IBSS)",
                    "International Bibliography of the Social Sciences",
                    "International Bibliography of the Social Sciences",
                    "ProQuest Computer Science Collection"
                ]
            },
            "addata": {
                "format": [
                    "journal"
                ],
                "ristype": [
                    "JOUR"
                ],
                "cop": [
                    "Chichester"
                ],
                "pub": [
                    "Wiley Periodicals Inc"
                ],
                "doi": [
                    "10.1002/jae.3029"
                ],
                "tpages": [
                    "18"
                ],
                "au": [
                    "Brewer, Dylan",
                    "Carlson, Alyssa"
                ],
                "atitle": [
                    "Addressing sample selection bias for machine learning methods"
                ],
                "date": [
                    "2024-04"
                ],
                "risdate": [
                    "2024"
                ],
                "volume": [
                    "39"
                ],
                "issue": [
                    "3"
                ],
                "spage": [
                    "383"
                ],
                "epage": [
                    "400"
                ],
                "pages": [
                    "383-400"
                ],
                "eissn": [
                    "1099-1255"
                ],
                "issn": [
                    "0883-7252"
                ],
                "abstract": [
                    "Summary\nWe study approaches for adjusting machine learning methods when the training sample differs from the prediction sample on unobserved dimensions. The machine learning literature predominately assumes selection only on observed dimensions. Common approaches are to weight or include variables that influence selection as solutions to selection on observables. Simulation results show that selection on unobservables increases mean squared prediction error using popular machine‐learning algorithms. Common machine learning practices such as weighting or including variables that influence selection into the training or prediction sample often worsen sample selection bias. We propose two control function approaches that remove the effects of selection bias before training and find that they reduce mean‐squared prediction error in simulations. We apply these approaches to predicting the vote share of the incumbent in gubernatorial elections using previously observed re‐election bids. We find that ignoring selection on unobservables leads to substantially higher predicted vote shares for the incumbent than when the control function approach is used."
                ],
                "jtitle": [
                    "Journal of applied econometrics (Chichester, England)"
                ],
                "genre": [
                    "article"
                ]
            },
            "sort": {
                "title": [
                    "Addressing sample selection bias for machine learning methods"
                ],
                "creationdate": [
                    "202404"
                ],
                "author": [
                    "Brewer, Dylan ; Carlson, Alyssa"
                ]
            },
            "control": {
                "iscdi": [
                    "true"
                ],
                "recordtype": [
                    "article"
                ],
                "sourceid": [
                    "proquest_cross"
                ],
                "recordid": [
                    "cdi_proquest_journals_3035293947"
                ],
                "addsrcrecordid": [
                    "eNp10EtLw0AQwPFFFKxV8CMEvHhJnX0kmz14KKX1QcGLnpd9TGxCHnU3RfrtTaxXT3P5MTP8CbmlsKAA7KE2uODA1BmZUVAqpSzLzskMioKnkmXsklzFWANADiBn5HHpfcAYq-4ziabdN5hEbNANVd8ltjIxKfuQtMbtqg6TBk3oJtrisOt9vCYXpWki3vzNOfnYrN9Xz-n27elltdymjguh0lIioC-sFxZprrhlQHkJmOeitGjHb1FYahRwZx3zIrOSGiick545kILPyd1p7z70XweMg677Q-jGk5oDz5jiSshR3Z-UC32MAUu9D1VrwlFT0FMcPcbRU5yRpif6XTV4_Nfp1-X61_8AB35k_Q"
                ],
                "sourcerecordid": [
                    "3035293947"
                ],
                "originalsourceid": [
                    "FETCH-LOGICAL-c3449-f7e0ed8bd4be1693b2013f0e664fbeb029e4b1a903cbc2d45b71a08cc7d2c0743"
                ],
                "sourcetype": [
                    "Aggregation Database"
                ],
                "sourceformat": [
                    "XML"
                ],
                "sourcesystem": [
                    "Other"
                ],
                "pqid": [
                    "3035293947"
                ],
                "score": [
                    "0.04715947"
                ]
            }
        },
        "delivery": {
            "link": [],
            "deliveryCategory": [
                "Remote Search Resource"
            ],
            "availability": [
                "fulltext"
            ],
            "displayLocation": false,
            "additionalLocations": false,
            "physicalItemTextCodes": "",
            "feDisplayOtherLocations": false,
            "displayedAvailability": "true",
            "holding": [],
            "almaOpenurl": "https://na03.alma.exlibrisgroup.com/view/uresolver/01CASLS_REGINA/openurl?ctx_enc=info:ofi/enc:UTF-8&ctx_id=10_1&ctx_tim=2025-03-06 17:37:06&ctx_ver=Z39.88-2004&url_ctx_fmt=info:ofi/fmt:kev:mtx:ctx&url_ver=Z39.88-2004&rfr_id=info:sid/primo.exlibrisgroup.com-proquest_cross&rft_val_fmt=info:ofi/fmt:kev:mtx:journal&rft.genre=article&rft.atitle=Addressing+sample+selection+bias+for+machine+learning+methods&rft.jtitle=Journal+of+applied+econometrics+%28Chichester%2C+England%29&rft.au=Brewer%2C+Dylan&rft.date=2024-04&rft.volume=39&rft.issue=3&rft.spage=383&rft.epage=400&rft.pages=383-400&rft.issn=0883-7252&rft.eissn=1099-1255&rft_id=info:doi/10.1002%2Fjae.3029&rft.pub=Wiley+Periodicals+Inc&rft.place=Chichester&rft_dat=<proquest_cross>3035293947</proquest_cross>&svc_dat=viewit&rft_pqid=3035293947"
        },
        "context": "PC",
        "adaptor": "Primo Central",
        "extras": {
            "citationTrails": {
                "citing": [
                    "FETCH-LOGICAL-c3449-f7e0ed8bd4be1693b2013f0e664fbeb029e4b1a903cbc2d45b71a08cc7d2c0743"
                ],
                "citedby": []
            },
            "timesCited": {}
        },
        "@id": "https://na03.alma.exlibrisgroup.com/primaws/rest/pub/pnxs/PC/cdi_proquest_journals_3035293947"
    }
]


module.exports = {
    AIData
};