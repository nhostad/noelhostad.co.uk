var str_util = {};

str_util.compare_strings = function(str_1, str_2)
{
	var i, start, broken = false;
	for(i = 0; i < str_1.length; i++)
	{
		if(str_1[i] !== str_2[i])
		{
			broken = true;
			break;
		}
	}
	if(broken)
	{
		start = Math.max(i-10, 0);
		return {str_1_segment:str_1.substr(start, 20), str_2_segment:str_2.substr(start, 20)};
	}
	else
	{
		return {result:'they match',comparison:(JSON.stringify(ab.assessment_obj) === ab.orig_as_json)};
	}
};

str_util.strip_tags = function( input )
{
	return input.replace(/(<([^>]+)>)/ig,"");
};

str_util.nh_trim = (function () {
    "use strict";

    function escapeRegex(string) {
        return string.replace(/[\[\](){}?*+\^$\\.|\-]/g, "\\$&");
    }

    return function trim(str, characters, flags) {
        flags = flags || "g";
        if (typeof str !== "string" || typeof characters !== "string" || typeof flags !== "string") {
            throw new TypeError("argument must be string");
        }

        if (!/^[gi]*$/.test(flags)) {
            throw new TypeError("Invalid flags supplied '" + flags.match(new RegExp("[^gi]*")) + "'");
        }

        characters = escapeRegex(characters);

        return str.replace(new RegExp("^[" + characters + "]+|[" + characters + "]+$", flags), '');
    };
}());

str_util.encode = function(input)
{
	return encodeURIComponent(input).replace('%20', '+');	
};

str_util.decode = function(input)
{
	return decodeURIComponent(input).split('+').join(' ');	
};

str_util.var_to_verbose = function(_input, _capitalise)
{
	var i, output = _input.split('_');
	
	for(i = 0; i < output.length; i++)
		output[i] = output[i][0].toUpperCase() + output[i].substr(1);
	
	return output.join(' ');
};

str_util.sanitise = function(text, _percent_space)
{
	var percent_space = (_percent_space === undefined) ? false : _percent_space;
	var space_char = (percent_space === true) ? '%20' : '+';
	
	return text.split('%').join('%25')
				.split(' ').join(space_char)
				.split('!').join('%21')
				.split('“').join('%22')
				.split('”').join('%22')
				.split('"').join('%22')
				.split('#').join('%23')
				.split('$').join('%24')
				.split("‘").join('%27')
				.split("’").join('%27')
				.split('&').join('%26')
				.split("'").join('%27')
				.split("/").join('%2F')
				.split('<').join('%3C')
				.split('>').join('%3E')
				.split('[').join('%5B')
				.split(']').join('%5D')
				.split('\r').join('%0D')
				.split('\n').join('%0A');
};

str_util.escapeUrlEntities = function (text)
{
	return text.split(' ').join('+')
				.split('%').join('%25')
				.split('!').join('%21')
				.split('"').join('%22')
				.split('#').join('%23')
				.split('$').join('%24')
				.split('&').join('%26')
				.split("'").join('%27');
};

str_util.unescapeUrlEntities = function (text)
{
	return decodeURIComponent(text)
				.split('+').join(' ')
				.split('%21').join('!')
				.split('%22').join('"')
				.split('%23').join('#')
				.split('%24').join('$')
				.split('%26').join('&')
				.split("%27").join("'")
				.split('%25').join('%');
};

str_util.urldecode = function(url)
{
	return decodeURIComponent(url.replace(/\+/g, ' '));
};

str_util.urlencode = function(url)
{
	return encodeURIComponent(url);
};

str_util.urlencTable = {
	' ' : '+',
  '!' : '%21',
	'"' : '%22',
	'#' : '%23',
	'$' : '%24',
	'%' : '%25',
	'&' : '%26',
	"'" : '%27',
	"(" : '%28',
	")" : '%29',
	"*" : '%2A',
	"+" : '%2B',
	"," : '%2C',
	"-" : '%2D',
	"." : '%2E',
	"/" : '%2F'
	/*0              %30
	1              %31
	2              %32
	3              %33
	4              %34
	5              %35
	6              %36
	7              %37
	8              %38
	9              %39
	:              %3A
	;              %3B
	<              %3C
	=              %3D
	>              %3E
	?              %3F
	@              %40
	A              %41
	B              %42
	C              %43
	D              %44
	E              %45
	F              %46
	G              %47
	H              %48
	I              %49
	J              %4A
	K              %4B
	L              %4C
	M              %4D
	N              %4E
	O              %4F
	P              %50
	Q              %51
	R              %52
	S              %53
	T              %54
	U              %55
	V              %56
	W              %57
	X              %58
	Y              %59
	Z              %5A
	[              %5B
	\              %5C
	]              %5D
	^              %5E
	_              %5F
	`              %60
	a              %61
	b              %62
	c              %63
	d              %64
	e              %65
	f              %66
	g              %67
	h              %68
	i              %69
	j              %6A
	k              %6B
	l              %6C
	m              %6D
	n              %6E
	o              %6F
	p              %70
	q              %71
	r              %72
	s              %73
	t              %74
	u              %75
	v              %76
	w              %77
	x              %78
	y              %79
	z              %7A
	{              %7B
	|              %7C
	}              %7D
	~              %7E
	¢              %A2
	£              %A3
	¥              %A5
	|              %A6
	§              %A7
	«              %AB
	¬              %AC
	¯              %AD
	º              %B0
	±              %B1
	ª              %B2
	,              %B4
	µ              %B5
	»              %BB
	¼              %BC
	½              %BD
	¿              %BF
	À              %C0
	Á              %C1
	Â              %C2
	Ã              %C3
	Ä              %C4
	Å              %C5
	Æ              %C6
	Ç              %C7
	È              %C8
	É              %C9
	Ê              %CA
	Ë              %CB
	Ì              %CC
	Í              %CD
	Î              %CE
	Ï              %CF
	Ð              %D0
	Ñ              %D1
	Ò              %D2
	Ó              %D3
	Ô              %D4
	Õ              %D5
	Ö              %D6
	Ø              %D8
	Ù              %D9
	Ú              %DA
	Û              %DB
	Ü              %DC
	Ý              %DD
	Þ              %DE
	ß              %DF
	à              %E0
	á              %E1
	â              %E2
	ã              %E3
	ä              %E4
	å              %E5
	æ              %E6
	ç              %E7
	è              %E8
	é              %E9
	ê              %EA
	ë              %EB
	ì              %EC
	í              %ED
	î              %EE
	ï              %EF
	ð              %F0
	ñ              %F1
	ò              %F2
	ó              %F3
	ô              %F4
	õ              %F5
	ö              %F6
	÷              %F7
	ø              %F8
	ù              %F9
	ú              %FA
	û              %FB
	ü              %FC
	ý              %FD
	þ              %FE
	ÿ              %FF*/
};

str_util.escapeHtmlEntities = function (text)
{
	return text.replace(/[\u00A0-\u2666<>\&]/g, function(c)
	{
		return '&' + 
		(str_util.entityTable[c.charCodeAt(0)] || '#'+c.charCodeAt(0)) + ';';
	});
};

// all HTML4 entities as defined here: http://www.w3.org/TR/html4/sgml/entities.html
// added: amp, lt, gt, quot and apos
str_util.entityTable = {
	34 : 'quot', 
	38 : 'amp', 
	39 : 'apos', 
	60 : 'lt', 
	62 : 'gt', 
	160 : 'nbsp', 
	161 : 'iexcl', 
	162 : 'cent', 
	163 : 'pound', 
	164 : 'curren', 
	165 : 'yen', 
	166 : 'brvbar', 
	167 : 'sect', 
	168 : 'uml', 
	169 : 'copy', 
	170 : 'ordf', 
	171 : 'laquo', 
	172 : 'not', 
	173 : 'shy', 
	174 : 'reg', 
	175 : 'macr', 
	176 : 'deg', 
	177 : 'plusmn', 
	178 : 'sup2', 
	179 : 'sup3', 
	180 : 'acute', 
	181 : 'micro', 
	182 : 'para', 
	183 : 'middot', 
	184 : 'cedil', 
	185 : 'sup1', 
	186 : 'ordm', 
	187 : 'raquo', 
	188 : 'frac14', 
	189 : 'frac12', 
	190 : 'frac34', 
	191 : 'iquest', 
	192 : 'Agrave', 
	193 : 'Aacute', 
	194 : 'Acirc', 
	195 : 'Atilde', 
	196 : 'Auml', 
	197 : 'Aring', 
	198 : 'AElig', 
	199 : 'Ccedil', 
	200 : 'Egrave', 
	201 : 'Eacute', 
	202 : 'Ecirc', 
	203 : 'Euml', 
	204 : 'Igrave', 
	205 : 'Iacute', 
	206 : 'Icirc', 
	207 : 'Iuml', 
	208 : 'ETH', 
	209 : 'Ntilde', 
	210 : 'Ograve', 
	211 : 'Oacute', 
	212 : 'Ocirc', 
	213 : 'Otilde', 
	214 : 'Ouml', 
	215 : 'times', 
	216 : 'Oslash', 
	217 : 'Ugrave', 
	218 : 'Uacute', 
	219 : 'Ucirc', 
	220 : 'Uuml', 
	221 : 'Yacute', 
	222 : 'THORN', 
	223 : 'szlig', 
	224 : 'agrave', 
	225 : 'aacute', 
	226 : 'acirc', 
	227 : 'atilde', 
	228 : 'auml', 
	229 : 'aring', 
	230 : 'aelig', 
	231 : 'ccedil', 
	232 : 'egrave', 
	233 : 'eacute', 
	234 : 'ecirc', 
	235 : 'euml', 
	236 : 'igrave', 
	237 : 'iacute', 
	238 : 'icirc', 
	239 : 'iuml', 
	240 : 'eth', 
	241 : 'ntilde', 
	242 : 'ograve', 
	243 : 'oacute', 
	244 : 'ocirc', 
	245 : 'otilde', 
	246 : 'ouml', 
	247 : 'divide', 
	248 : 'oslash', 
	249 : 'ugrave', 
	250 : 'uacute', 
	251 : 'ucirc', 
	252 : 'uuml', 
	253 : 'yacute', 
	254 : 'thorn', 
	255 : 'yuml', 
	402 : 'fnof', 
	913 : 'Alpha', 
	914 : 'Beta', 
	915 : 'Gamma', 
	916 : 'Delta', 
	917 : 'Epsilon', 
	918 : 'Zeta', 
	919 : 'Eta', 
	920 : 'Theta', 
	921 : 'Iota', 
	922 : 'Kappa', 
	923 : 'Lambda', 
	924 : 'Mu', 
	925 : 'Nu', 
	926 : 'Xi', 
	927 : 'Omicron', 
	928 : 'Pi', 
	929 : 'Rho', 
	931 : 'Sigma', 
	932 : 'Tau', 
	933 : 'Upsilon', 
	934 : 'Phi', 
	935 : 'Chi', 
	936 : 'Psi', 
	937 : 'Omega', 
	945 : 'alpha', 
	946 : 'beta', 
	947 : 'gamma', 
	948 : 'delta', 
	949 : 'epsilon', 
	950 : 'zeta', 
	951 : 'eta', 
	952 : 'theta', 
	953 : 'iota', 
	954 : 'kappa', 
	955 : 'lambda', 
	956 : 'mu', 
	957 : 'nu', 
	958 : 'xi', 
	959 : 'omicron', 
	960 : 'pi', 
	961 : 'rho', 
	962 : 'sigmaf', 
	963 : 'sigma', 
	964 : 'tau', 
	965 : 'upsilon', 
	966 : 'phi', 
	967 : 'chi', 
	968 : 'psi', 
	969 : 'omega', 
	977 : 'thetasym', 
	978 : 'upsih', 
	982 : 'piv', 
	8226 : 'bull', 
	8230 : 'hellip', 
	8242 : 'prime', 
	8243 : 'Prime', 
	8254 : 'oline', 
	8260 : 'frasl', 
	8472 : 'weierp', 
	8465 : 'image', 
	8476 : 'real', 
	8482 : 'trade', 
	8501 : 'alefsym', 
	8592 : 'larr', 
	8593 : 'uarr', 
	8594 : 'rarr', 
	8595 : 'darr', 
	8596 : 'harr', 
	8629 : 'crarr', 
	8656 : 'lArr', 
	8657 : 'uArr', 
	8658 : 'rArr', 
	8659 : 'dArr', 
	8660 : 'hArr', 
	8704 : 'forall', 
	8706 : 'part', 
	8707 : 'exist', 
	8709 : 'empty', 
	8711 : 'nabla', 
	8712 : 'isin', 
	8713 : 'notin', 
	8715 : 'ni', 
	8719 : 'prod', 
	8721 : 'sum', 
	8722 : 'minus', 
	8727 : 'lowast', 
	8730 : 'radic', 
	8733 : 'prop', 
	8734 : 'infin', 
	8736 : 'ang', 
	8743 : 'and', 
	8744 : 'or', 
	8745 : 'cap', 
	8746 : 'cup', 
	8747 : 'int', 
	8756 : 'there4', 
	8764 : 'sim', 
	8773 : 'cong', 
	8776 : 'asymp', 
	8800 : 'ne', 
	8801 : 'equiv', 
	8804 : 'le', 
	8805 : 'ge', 
	8834 : 'sub', 
	8835 : 'sup', 
	8836 : 'nsub', 
	8838 : 'sube', 
	8839 : 'supe', 
	8853 : 'oplus', 
	8855 : 'otimes', 
	8869 : 'perp', 
	8901 : 'sdot', 
	8968 : 'lceil', 
	8969 : 'rceil', 
	8970 : 'lfloor', 
	8971 : 'rfloor', 
	9001 : 'lang', 
	9002 : 'rang', 
	9674 : 'loz', 
	9824 : 'spades', 
	9827 : 'clubs', 
	9829 : 'hearts', 
	9830 : 'diams', 
	338 : 'OElig', 
	339 : 'oelig', 
	352 : 'Scaron', 
	353 : 'scaron', 
	376 : 'Yuml', 
	710 : 'circ', 
	732 : 'tilde', 
	8194 : 'ensp', 
	8195 : 'emsp', 
	8201 : 'thinsp', 
	8204 : 'zwnj', 
	8205 : 'zwj', 
	8206 : 'lrm', 
	8207 : 'rlm', 
	8211 : 'ndash', 
	8212 : 'mdash', 
	8216 : 'lsquo', 
	8217 : 'rsquo', 
	8218 : 'sbquo', 
	8220 : 'ldquo', 
	8221 : 'rdquo', 
	8222 : 'bdquo', 
	8224 : 'dagger', 
	8225 : 'Dagger', 
	8240 : 'permil', 
	8249 : 'lsaquo', 
	8250 : 'rsaquo', 
	8364 : 'euro'
};

$.fn.textWidth = function(){
  var html_org = $(this).html();
  var html_calc = '<span>' + html_org + '</span>';
  $(this).html(html_calc);
  var width = $(this).find('span:first').width();
  $(this).html(html_org);
  return width;
};

str_util.encode_path = function(path)
{
	return encodeURIComponent(path.split('.').join('{dot}').split('/').join('{slash}'));
};

str_util.decode_path = function(path)
{
	return decodeURIComponent(path).split('{dot}').join('.').split('{slash}').join('/');
};