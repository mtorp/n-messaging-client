import myft from 'next-myft-client';
import Cookies from 'js-cookie';

module.exports = function signUpToDigest () {
    function getCSRFToken () {
        const desiredTokenLength = 36;
        const token = Cookies.get('FTSession_s') || Cookies.get('FTSession');
        const csrfToken = token ? token.slice(-desiredTokenLength) : '';
        return csrfToken;
    }

    function addUserToDigest () {
        return await myft.add('user', null, 'preferred', 'preference', 'email-digest', {
            token: getCSRFToken,
            _rel:{
                type: 'daily',
                sendTime:'every morning'
            }
        });
    }

    return myft.init().then(addUserToDigest);

};
