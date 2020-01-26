const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const languageTranslator = new LanguageTranslatorV3({
  version: '2018-05-01',
  authenticator: new IamAuthenticator({
    apikey: 'Jj2qwphGG2Xh5W90MvDrL4w0_oIZoJ3S8rdUa_vxPTWf',
  }),
  url: 'https://gateway-lon.watsonplatform.net/language-translator/api',
});

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
        default:
            return ('Unknown');
    }
}
exports.detector = (str) =>{
    message = str;
    const identifyParams = {
        text: str
      };
      
      languageTranslator.identify(identifyParams)
        .then(identifiedLanguages => {
          console.log(identifiedLanguages.result.languages[0].language);
          language = getlang(identifiedLanguages.result.languages[0].language);
          langid=identifiedLanguages.result.languages[0].language;
          result= {message,language,langid,error:false }
          console.log(result);
          return(result);
        })
        .catch(err => {
          console.log('error:', err);
          return({error:true});
        });
}

exports.translator= (str) => {
    message = str;
    const identifyParams = {
        text: str
      };
      
      languageTranslator.identify(identifyParams)
        .then(identifiedLanguages => {
          console.log(identifiedLanguages.result.languages[0].language);
          language = getlang(identifiedLanguages.result.languages[0].language);
          langid=identifiedLanguages.result.languages[0].language;
          const translateParams = {
            text: str,
            modelId: langid+'-en',
          };
          if(langid=='en'){
            return({error:true,msg:'English Language Cannot be translated'});
          }
          languageTranslator.translate(translateParams)
            .then(translationResult => {
             result = translationResult.result.translations[0].translation;
             console.log({error:false,result,message});
              return({error:false,result,message,language});
            })
            .catch(err => {
              console.log('error:', err);
              return({error:true,msg:'Current Language not Supported'});
            });
        })
        .catch(err => {
          console.log('error:', err);
          return({error:true,msg:'Network Error'});
        });




}