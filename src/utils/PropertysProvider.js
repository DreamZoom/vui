export default {
	getBasePropertys(type) {
		if (type == 'image') {
			return [
				{
					propertyName: 'body',
					propertyText: '内容',
					propertyType: 'image'
				},
				{
					propertyName: 'textAlign',
					propertyText: '对齐方式',
					propertyType: 'radios',
					propertyRange: [ 'left', 'center', 'right' ]
				}
			];
		}

		var baseAttributes = [
			{
				propertyName: 'body',
				propertyText: '内容'
			},
			{
				propertyName: 'textAlign',
				propertyText: '对齐方式',
				propertyType: 'radios',
				propertyRange: [ 'left', 'center', 'right' ]
			}
		];
		return baseAttributes;
	},

	getPagePropertys() {
		return [
			{
				propertyName: 'backgroundColor',
				propertyText: '背景色',
				propertyType: 'color'
			}
		];
    },
    
    getElementPropertys(component){
        var styleAttributes = [
			{
				propertyName: 'left',
				propertyText: '横坐标',
				propertyType: 'number'
			},
			{
				propertyName: 'top',
				propertyText: '纵坐标',
				propertyType: 'number'
			},
			{
				propertyName: 'width',
				propertyText: '宽度',
				propertyType: 'number'
			},
			{
				propertyName: 'height',
				propertyText: '高度',
				propertyType: 'number'
			},
			{
				propertyName: 'backgroundColor',
				propertyText: '背景色',
				propertyType: 'color'
			},
			{
				propertyName: 'padding',
				propertyText: '内边距',
				propertyType: 'number'
			},
			{
				propertyName: 'margin',
				propertyText: '外边距',
				propertyType: 'number'
			}
        ];
        
        return styleAttributes;
    }
};
