module.exports = function () {
	function getItem(h) {
		switch (h) {
			case 'eqmac.app': return { strict: false, key: 'EQM_PRIVACY_CONSENT_CHOSEN', value: 'true' };
			case 'figuya.com': return { strict: false, key: 'cookie-dialog', value: 'closed' };
			case 'scoodleplay.be': return { strict: false, key: 'scoodleAllowCookies', value: 'true' };
			case 'lifesum.com': return { strict: false, key: 'accepted-cookies', value: '[]' };
			case 'm.aliexpress.com': return { strict: false, key: 'MSITE_GDPR', value: 'true' };
			case 'programmitv.it': return { strict: false, key: 'privacy_choices_made', value: 'OK' };
			case 'nexus.gg': return { strict: true, key: 'cookie-notice:accepted', value: 'true' };
			case 'streamelements.com': return { strict: true, key: 'StreamElements.gdprNoticeAccepted', value: 'true' };

			case 'phoenix.de': return { strict: false, key: 'user_anonymous_profile', value: '{"config":{"tracking":false,"userprofile":false,"youtube":false,"twitter":false,"facebook":false,"iframe":false,"video":{"useSubtitles":false,"useAudioDescription":false}},"votings":[],"msgflash":[],"history":[]}' };

			case 'klarna.com':
				return [
					{ strict: true, key: 'trackingConsentAnalyticsKey', value: 'false' },
					{ strict: true, key: 'trackingConsentMarketingKey', value: 'false' }
				];

			case 'krant.volkskrant.nl':
			case 'krant.dg.nl':
			case 'krant.demorgen.be':
			case 'krant.trouw.nl':
			case 'krant.ad.nl':
			case 'krant.parool.nl':
			case 'krant.ed.nl':
				return [
					{ strict: false, key: 'vl_disable_tracking', value: 'true' },
					{ strict: false, key: 'vl_disable_usecookie', value: 'selected' }
				];
		}


		const parts = h.split('.');

		if (parts.length > 2) {
			parts.shift();
			return getItem(parts.join('.'));
		}

		return false;
	}


	let h = document.location.hostname.replace(/^w{2,3}\d*\./i, ''),
		counter = 0,
		items = getItem(h);

	if (items) {
		(items instanceof Array ? items : [items]).forEach(function (item) {
			let value = localStorage.getItem(item.key);

			if (value == null || (item.strict && value != item.value)) {
				localStorage.setItem(item.key, item.value);
				counter++;
			}
		});

		if (counter > 0)
			document.location.reload();
	}
}