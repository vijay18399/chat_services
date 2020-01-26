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
          return({error:true,msg:'Current Language not Supported'});
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
