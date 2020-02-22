var request = require('request');
var arr = require('../spam');
const getUrls = require('get-urls');
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const languageTranslator = new LanguageTranslatorV3({
  version: '2018-05-01',
  authenticator: new IamAuthenticator({
    apikey: 'Jj2qwphGG2Xh5W90MvDrL4w0_oIZoJ3S8rdUa_vxPTWf',
  }),
  url: 'https://gateway-lon.watsonplatform.net/language-translator/api',
});
var models =['ar-en','bg-en','zh-en','zh-TW-en','hr-en','cs-en','da-en','nl-en','et-en','fi-en','fr-en','de-en','el-en','he-en','hi-en','hu-en','id-en','ga-en','it-en','ja-en','ko-en','lt-en','ms-en','nb-en','pl-en','pt-en','ro-en','ru-en','sk-en','es-en','sv-en','th-en','tr-en']
function getlang(langid){
    switch (langid) {
        case 'ar':
            return ('Arabic');
            break;
        case 'en':
            return ('English');
            break;
        case 'bg':
            return ('Bulgarian');
            break;
        case 'ca':
            return ('Catalan');
            break;
        case 'zh':
            return ('Chinese (Simplified)');
            break;
        case 'zh-TW':
            return ('Chinese (Traditional)');
            break;
        case 'et':
            return ('Estonian');
            break;
        case 'cs':
            return ('Czech');
            break;
        case 'nl':
            return ('Danish ');
            break;
        case 'fi':
            return ('Finnish');
            break;
        case 'fr':
            return ('French');
            break;
        case 'de':
            return ('German');
            break;
        case 'tr':
            return ('Turkish');
            break;
        case 'th':
            return ('Thai');
            break;
        case 'sv':
            return ('Swedish');
            break;
        case 'es':
            return ('Spanish');
            break;
        case 'sl':
            return ('Slovenian');
            break;
        case 'sk':
            return ('Slovak');
            break;
        case 'ru':
            return ('Russian');
            break;
        case 'ro':
            return ('Romanian');
            break;
        case 'pt':
            return ('Portuguese');
            break;
        case 'pl':
            return ('Polish');
            break;
        case 'nb':
            return ('Norwegian Bokmål');
            break;
        case 'ms':
            return ('Malay');
            break;
        case 'lt':
            return ('Lithuanian');
            break;
        case 'ko':
            return ('Korean');
            break;
        case 'ja':
            return ('Japanese');
            break;
        case 'it':
            return ('Italian');
            break;
        case 'ko':
            return ('Korean');
            break;
        case 'id':
            return ('Indonesian');
            break;
        case 'hu':
            return ('Hungarian');
            break;
        case 'hi':
            return ('Hindi');
            break;
        case 'he':
            return ('Hebrew');
            break;
        case 'el':
            return ('Greek');
            break;
        case 'te':
            return ('Telugu');
            break;
        default:
            return ('Unknown');
    }
}
function getOptions(langid) {

  switch (langid) {
      case 'ar':
          result = {
              language: "Arabic",
              languages: [{
                  name: "English",
                  model: "ar-en"
              }]
          };
          break;
      case 'bg':
          result = {
              language: "Bulgarian",
              languages: [{
                  name: "English",
                  model: "bg-en"
              }]
          };
          break;
      case 'ca':
          result = {
              language: "Catalan",
              languages: [{
                  name: "Spanish",
                  model: "ca-es"
              }]
          };
          break;
      case 'zh':
          result = {
              language: "Chinese",
              languages: [{
                  name: "English",
                  model: "zh-en"
              }]
          };
          break;
      case 'zh-TW':
          result = {
              language: "Chinese",
              languages: [{
                  name: "English",
                  model: "zh-TW-en"
              }]
          };
          break;
      case 'hr':
          result = {
              language: "Croatian",
              languages: [{
                  name: "English",
                  model: "hr-en"
              }]
          };
          break;
      case 'cs':
          result = {
              language: "Czech",
              languages: [{
                  name: "English",
                  model: "cs-en"
              }]
          };
          break;
      case 'da':
          result = {
              language: "Danish",
              languages: [{
                  name: "English",
                  model: "da-en"
              }]
          };
          break;
      case 'nl':
          result = {
              language: "Dutch",
              languages: [{
                  name: "English",
                  model: "nl-en"
              }]
          };
          break;
      case 'en':
          result = {
              language: "English",
              languages: [{
                      name: "Arabic",
                      model: "en-ar"
                  },
                  {
                      name: "Bulgarian",
                      model: "en-bg"
                  },
                  {
                      name: "Czech",
                      model: "en-cs"
                  },
                  {
                      name: "Danish",
                      model: "en-da"
                  },
                  {
                      name: "German",
                      model: "en-de"
                  },
                  {
                      name: "Greek",
                      model: "en-el"
                  },
                  {
                      name: "Spanish",
                      model: "en-es"
                  },
                  {
                      name: "Estonian",
                      model: "en-et"
                  },
                  {
                      name: "Finnish",
                      model: "en-fi"
                  },
                  {
                      name: "French",
                      model: "en-fr"
                  },
                  {
                      name: "Irish",
                      model: "en-ga"
                  },
                  {
                      name: "Hebrew",
                      model: "en-he"
                  },
                  {
                      name: "Hindi",
                      model: "en-hi"
                  },
                  {
                      name: "Croatian",
                      model: "en-hr"
                  },
                  {
                      name: "Indonesian",
                      model: "en-id"
                  },
                  {
                      name: "Italian",
                      model: "en-it"
                  },
                  {
                      name: "Japanese",
                      model: "en-ja"
                  },
                  {
                      name: "Korean",
                      model: "en-ko"
                  },
                  {
                      name: "Latvian",
                      model: "en-lv"
                  },
                  {
                      name: "Lithuanian",
                      model: "en-lt"
                  },
                  {
                      name: "Malay",
                      model: "en-ms"
                  },
                  {
                      name: "Norwegian Bokmal",
                      model: "en-nb"
                  },
                  {
                      name: "Dutch",
                      model: "en-nl"
                  },
                  {
                      name: "Polish",
                      model: "en-pl"
                  },
                  {
                      name: "Portuguese",
                      model: "en-pt"
                  },
                  {
                      name: "Romanian",
                      model: "en-ro"
                  },
                  {
                      name: "Russian",
                      model: "en-ru"
                  },
                  {
                      name: "Slovak",
                      model: "en-sk"
                  },
                  {
                      name: "Slovenian",
                      model: "en-sl"
                  },
                  {
                      name: "Swedish",
                      model: "en-sv"
                  },
                  {
                      name: "Thai",
                      model: "en-th"
                  },
                  {
                      name: "Turkish",
                      model: "en-tr"
                  },
                  {
                      name: "Simplified Chinese",
                      model: "en-zh"
                  },
                  {
                      name: "Traditional Chinese",
                      model: "en-zh-TW"
                  },
                  {
                      name: "Urdu ",
                      model: "en-ur"
                  },
                  {
                      name: "Vietnamese",
                      model: "en-vi"
                  }
              ]
          };
          break;
      case 'et':
          result = {
              language: "Estonian",
              languages: [{
                  name: "English",
                  model: "et-en"
              }]
          };
          break;
      case 'fi':
          result = {
              language: "Finnish",
              languages: [{
                  name: "English",
                  model: "fi-en"
              }]
          };
          break;
      case 'fr':
          result = {
              language: "French",
              languages: [{
                      name: "German",
                      model: "fr-de"
                  },
                  {
                      name: "English",
                      model: "fr-en"
                  },
                  {
                      name: "Spanish",
                      model: "fr-es"
                  }
              ]
          };
          break;
      case 'de':
          result = {
              language: "German",
              languages: [{
                      name: "English",
                      model: "de-en"
                  },
                  {
                      name: "French",
                      model: "de-fr"
                  },
                  {
                      name: "Italian",
                      model: "de-it"
                  }
              ]
          };
          break;
      case 'el':
          result = {
              language: "Greek",
              languages: [{
                  name: "English",
                  model: "el-en"
              }]
          };
          break;
      case 'he':
          result = {
              language: "Hebrew",
              languages: [{
                  name: "English",
                  model: "he-en"
              }]
          };
          break;
      case 'hi':
          result = {
              language: "Hindi",
              languages: [{
                  name: "English",
                  model: "hi-en"
              }]
          };
          break;
      case 'hu':
          result = {
              language: "Hungarian",
              languages: [{
                  name: "English",
                  model: "hu-en"
              }]
          };
          break;
      case 'id':
          result = {
              language: "Indonesian",
              languages: [{
                  name: "English",
                  model: "id-en"
              }]
          };
          break;
      case 'ga':
          result = {
              language: "Irish",
              languages: [{
                  name: "English",
                  model: "ga-en"
              }]
          };
          break;
      case 'it':
          result = {
              language: "Italian",
              languages: [{
                      name: "German",
                      model: "it-de"
                  },
                  {
                      name: "English",
                      model: "it-en"
                  }
              ]
          };
          break;
      case 'ja':
          result = {
              language: "Japanese",
              languages: [{
                  name: "English",
                  model: "ja-en"
              }]
          };
          break;
      case 'ko':
          result = {
              language: "Korean",
              languages: [{
                  name: "English",
                  model: "ko-en"
              }]
          };
          break;
      case 'lv':
          result = {
              language: "Latvian",
              languages: [{
                  name: "English",
                  model: "lv-en"
              }]
          };
          break;
      case 'lt':
          result = {
              language: "Lithuanian",
              languages: [{
                  name: "English",
                  model: "lt-en"
              }]
          };
          break;
      case 'ms':
          result = {
              language: "Malay",
              languages: [{
                  name: "English",
                  model: "ms-en"
              }]
          };
          break;
      case '':
          result = {
              language: "",
              languages: [{
                  name: "English",
                  model: ""
              }]
          };
          break;
      case 'nb':
          result = {
              language: "Norwegian Bokmal",
              languages: [{
                  name: "English",
                  model: "nb-en"
              }]
          };
          break;
      case 'pl':
          result = {
              language: "Polish",
              languages: [{
                  name: "English",
                  model: "pl-en"
              }]
          };
          break;
      case 'pt':
          result = {
              language: "Portuguese",
              languages: [{
                  name: "English",
                  model: "pt-en"
              }]
          };
          break;
      case 'ro':
          result = {
              language: "Romanian",
              languages: [{
                  name: "English",
                  model: "ro-en"
              }]
          };
          break;
      case 'ru':
          result = {
              language: "Russian",
              languages: [{
                  name: "English",
                  model: "ru-en"
              }]
          };
          break;
      case 'sk':
          result = {
              language: "Slovak",
              languages: [{
                  name: "English",
                  model: "sk-en"
              }]
          };
          break;
      case 'sl':
          result = {
              language: "Slovenian",
              languages: [{
                  name: "English",
                  model: "sl-en"
              }]
          };
          break;
      case 'es':
          result = {
              language: "Spanish",
              languages: [{
                      name: "Catalan",
                      model: "es-ca"
                  },
                  {
                      name: "English",
                      model: "es-en"
                  },
                  {
                      name: "French",
                      model: "es-fr"
                  }
              ]
          };
          break;
      case 'sv':
          result = {
              language: "Swedish",
              languages: [{
                  name: "English",
                  model: "sv-en"
              }]
          };
          break;
      case 'th':
          result = {
              language: "Thai",
              languages: [{
                  name: "English",
                  model: "th-en"
              }]
          };
          break;
      case 'tr':
          result = {
              language: "Turkish",
              languages: [{
                  name: "English",
                  model: "tr-en"
              }]
          };
          break;
      case 'ur':
          result = {
              language: "Urdu",
              languages: [{
                  name: "English",
                  model: "ur-en"
              }]
          };
          break;
      case 'vi':
          result = {
              language: "Vietnamese",
              languages: [{
                  name: "English",
                  model: "vi-en"
              }]
          };
          break;
  }
  return result;
}

exports.Url = (req, res) => {
  result=[]
  spam=arr.arr;
  console.log(req.body.message);
 var urls = Array.from(getUrls(req.body.message)); 
 for (i = 0; i < urls.length; i++) {
  if(urls[i].search('bit.ly')!= -1 || urls[i].search('goo.gl')!= -1)
  {
   urls[i] = urls[i];
  }
   spamcheck = spam.includes(urls[i]);
   var url_instance = {
     url :  urls[i],
     spamcheck :spamcheck ? 'spam' :'ham'
   } 
   result.push(url_instance);
}
console.log(result);
  
  return res.status(201).json(result);
  
}; 

exports.Detect = (req, res) => {
  message = req.body.message;
  const identifyParams = {
    text: req.body.message
  };
  
  languageTranslator.identify(identifyParams)
    .then(identifiedLanguages => {
      console.log(identifiedLanguages.result.languages[0].language);
      language = getlang(identifiedLanguages.result.languages[0].language);
      langid=identifiedLanguages.result.languages[0].language;
      result= {message,language,langid,error:false }
      console.log(result);
      return res.status(201).json(result);
    })
    .catch(err => {
      console.log('error:', err);
      return res.status(201).json({error:true});
    });
};

exports.Translate = (req, res) => {

  try {
    message = req.body.message;
  const identifyParams = {
    text: req.body.message
  };
  
  languageTranslator.identify(identifyParams)
    .then(identifiedLanguages => {
      language = getlang(identifiedLanguages.result.languages[0].language);
      langid=identifiedLanguages.result.languages[0].language;
      modelId=langid+'-en';
      const translateParams = {
        text: req.body.message,
        modelId: langid+'-en',
      };
      console.log(modelId);
      console.log(models.includes(translateParams.modelId));
      if(langid=='en'){
        res.status(201).json({error:true,msg:'English Language Cannot be translated'});
      }
      else if(!models.includes(translateParams.modelId)) {
        res.status(201).json({error:true,msg:'Current Language not Supported for translation'});
      } else{
        languageTranslator.translate(translateParams)
        .then(translationResult => {
         result = translationResult.result.translations[0].translation;
         console.log({error:false,result,message});
         res.status(201).json({error:false,result,message,language});
        })
        .catch(err => {
          console.log('error:', err);
          res.status(201).json({error:true,msg:'Current Language not Supported'});
        });

      }
    
    })
    .catch(err => {
      console.log('error:', err);
      res.status(201).json({error:true,msg:'Network Error'});
    });
  }
  catch(err) {
    res.status(201).json({error:true,msg:'Current Language not Supported'});
  }

  

};

exports.GetLangOtions = (req, res) => {
  message = req.body.message;
  const identifyParams = {
    text: req.body.message
  };
  
  languageTranslator.identify(identifyParams)
    .then(identifiedLanguages => {
      console.log(identifiedLanguages.result.languages[0].language);
      options = getOptions(identifiedLanguages.result.languages[0].language);
      langid=identifiedLanguages.result.languages[0].language;
      result= {message,options,langid,error:false }
      console.log(result);
      return res.status(201).json(result);
    })
    .catch(err => {
      console.log('error:', err);
      return res.status(201).json({error:true});
    });
};


exports.Translater = (req, res) => {
  message = req.body.message;
  const identifyParams = {
    text: req.body.message
  };
    const translateParams = {
      text: req.body.message,
      modelId: req.params.modelId,
    };
    languageTranslator.translate(translateParams)
    .then(translationResult => {
     result = translationResult.result.translations[0].translation;
     console.log({error:false,result,message});
     res.status(201).json({error:false,result,message});
    })
    .catch(err => {
      console.log('error:', err);
      res.status(201).json({error:true,msg:'Current Language not Supported Now'});
    });
  

};

