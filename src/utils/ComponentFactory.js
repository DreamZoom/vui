export default {
	create: function(type, params) {
		if (type == 'text') {
			return {
				type: 'text',
				propertys: {
					left: 0,
					top: 0,
					width: 200,
					height: 100,
					body: '请输入内容'
				},
				animations: []
			};
        }
        
        if (type == 'image') {
			return {
				type: 'image',
				propertys: {
					left: 0,
					top: 0,
					width: 200,
					height: 100,
					body: 'http://img05.tooopen.com/images/20150820/tooopen_sy_139205349641.jpg'
				},
				animations: []
			};
        }
        
        if (type == 'chart') {
			return {
				type: 'chart',
				propertys: {
					left: 0,
					top: 0,
					width: 200,
					height: 100,
					body: ''
				},
				animations: []
			};
		}
	}
};
