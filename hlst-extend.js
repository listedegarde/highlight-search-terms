(function($){
	var accentedForms = {
		'a':'ªàáâãäåāăąầằảẩẳẫẵấắạậặɑǎ',
		'o':'ºòóôõöøōŏőơồờỏổởỗỡốớọộợǒ',
		'A':'ÀÁÂÃÄÅĀĂĄẦẰẢẨẲẪẴẤẮẠẬẶǍ',
		'AE':'Æ',
		'C':'ÇĆĈĊČ',
		'E':'ÈÉÊËĒĔĖĘĚ€ỀẺỂẼỄẾẸỆ',
		'I':'ÌÍÎÏĨĪĬĮİỈỊǏ',
		'D':'ÐĎĐ',
		'N':'ÑŃŅŇŉŋ',
		'O':'ÒÓÔÕÖØŌŎŐƠỒỜỎỔỞỖỠỐỚỌỘỢǑ',
		'U':'ÙÚÛÜŨŪŬŮŰŲƯỪỦỬỮỨỤỰǕǗǓǙǛ',
		'Y':'ÝŶŸỲỶỸỴ',
		'TH':'Þ',
		's':'ßśŝşšſș',
		'ae':'æ',
		'c':'çćĉċč',
		'e':'èéêëēĕėęěềẻểẽễếẹệ',
		'i':'ìíîïĩīĭįıỉịǐ',
		'd':'ðďđ',
		'n':'ñńņňŊ',
		'u':'ùúûüũūŭůűųưừủửữứụựǖǘǔǚǜ',
		'y':'ýÿŷỳỷỹỵ',
		'th':'þ',
		'G':'ĜĞĠĢ',
		'g':'ĝğġģ',
		'H':'ĤĦ',
		'h':'ĥħ',
		'IJ':'Ĳ',
		'ij':'ĳ',
		'J':'Ĵ',
		'j':'ĵ',
		'K':'Ķ',
		'k':'ķĸ',
		'L':'ĹĻĽĿŁ',
		'l':'ĺļľŀł',
		'OE':'Œ',
		'oe':'œ',
		'R':'ŔŖŘ',
		'r':'ŕŗř',
		'S':'ŚŜŞŠȘ',
		'T':'ŢŤŦȚ',
		't':'ţťŧț',
		'W':'Ŵ',
		'w':'ŵ',
		'Z':'ŹŻŽ',
		'z':'źżž',
	};
	$.fn.highlight = function( term, insensitive, t , c ) {
		return this.each(function(){
			t = t || 'mark';
			c = c || 'hilite';
			var node = this.firstChild,
			val,
			new_val,
			remove = [],
			skip = ['SCRIPT', 'STYLE', 'INPUT', 'SELECT', 'BUTTON', 'OBJECT', 'APPLET', 'TEXTAREA', 'PRE', 'CODE', 'EMBED', 'IFRAME'];

			if ( term && node && $.inArray(this.nodeName, skip) == -1 ) {
				regex = new RegExp(term, insensitive ? 'ig' : 'g');

				do {
					if ( node.nodeType === 3 ) {
						val = node.nodeValue;
						new_val = val.replace( regex, function(x){
							return '<' + t + ' class="' + c + '">' + x + '</' + t + '>';
						} );
						if ( new_val !== val ) {
							$(node).before( new_val );
							remove.push( node );
						}
					}
				} while ( node = node.nextSibling );
			}

			remove.length && $(remove).remove();
		});
	};

	if (typeof(hlst_query) != 'undefined') {
		if (hlst_query.length == 0) {
			var ref = document.referrer.split('?');
			/*
			console.log('referrer query parameters: ' + ref[1]);
			*/
			if (typeof(ref[1]) != 'undefined') {
				var term;
				if (document.referrer.indexOf('yahoo.com') > -1) {
					term = 'p';
				} else if (document.referrer.indexOf('goodsearch.com') > -1) {
					term = 'keywords';
				} else if (document.referrer.indexOf('mywebsearch.com') > -1) {
					term = 'searchfor';
				} else if (document.referrer.indexOf('baidu.') > -1) {
					term = 'wd';
				} else {
					term = 'q';
				}
				/*
				console.log('searchengine term: ' + term);
				*/
				var parms = ref[1].split('&');
				/*
				console.log('parms split into ' + parms.length);
				*/
				for (var i=0; i < parms.length; i++) {
					/*
					console.log('parameter ' + i + ': ' + parms[i]);
					*/
					var pos = parms[i].indexOf('=');
					if (pos > 0) {
						if(term == parms[i].substring(0,pos)) {
							qstr = decodeURIComponent((parms[i].substring(pos+1)+'').replace(/\+/g, '%20'));
							/*
							console.log('search query found: ' + qstr);
							*/
							qarr = qstr.match(/([^\s"]+)|"([^"]*)"/g) || [];
							for (var j=0; j < qarr.length; j++){
								/*
								console.log('added ' + qarr[j] + ' to search array');
								*/
								hlst_query[j] = qarr[j].replace(/"/g,'');
							}
							break;
						}
					}
				}
			}
		}

		var area, i, s;
		var t = jQuery.support.opacity ? 'mark' : 'span';

		if (hlst_query.length != 0) {
			for (s in hlst_areas){
				area = $(hlst_areas[s]);
				/*
				console.log('testing area: ' + hlst_areas[s]);
				*/
				if (area.length != 0){
					for (i in hlst_query){
						var term = hlst_query[i].replace(/([-.*+?^${}()|[\]\/\\])/g,"\\$1");

						for (var s in accentedForms) {
							for (var x in accentedForms[s].split('')) {
								term = term.split(accentedForms[s].charAt(x)).join(s);
							}
							term = term.split(s).join('[' + s + accentedForms[s] + ']');
						}

						/*
						console.log('searching for: ' + hlst_query[i]);
						*/
						area.highlight(term, true, t, 'hilite term-' + i);
						area.find('*').highlight(term, true, t, 'hilite term-' + i)
					}
					break;
				}
			}
		}
	}
	if ('function'==typeof Cufon) Cufon.refresh();
})(jQuery);
