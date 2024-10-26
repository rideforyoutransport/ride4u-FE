import React, { useEffect } from 'react';

const Redirection = () => {

    function getOS() {
        var uA = navigator.userAgent || navigator.vendor || window.opera;
        if ((/iPad|iPhone|iPod/.test(uA) && !window.MSStream) || (uA.includes('Mac') && 'ontouchend' in document)) return 'iOS';
      
        var i, os = ['Windows', 'Android', 'Unix', 'Mac', 'Linux', 'BlackBerry'];
        for (i = 0; i < os.length; i++) if (new RegExp(os[i],'i').test(uA)) return os[i];
      }
    

      function redirectionLogic(){

        if(getOS()=='iOS' || getOS()=='Mac'){
            window.location.replace("https://apps.apple.com/in/app/rideforyou-transport/id6505006863");
        }else if(getOS()=='Android' || getOS() =='Linux'){
            window.location.replace("https://play.google.com/store/apps/details?id=com.rideforyoutransport.rideforyou&pcampaignid=web_share");
        }
      }

      useEffect(() => {
        redirectionLogic();
        console.log(getOS);
      }, [])
      
  return (<><p>Redirecting...</p></>);
};

export default Redirection;
