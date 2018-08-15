import $ from 'jquery';

export default {
	playAnimation: function() {
		$('[data-animations]').each(function() {
			var animations = $(this).data('animations');
		});
	},
	previewAnimation: function() {
        var context=this;
		$('[data-preview-animation]').each(function() {
            var animation_str = $(this).attr('data-preview-animation');
            if(animation_str){
               var animation =context.deserialize(animation_str);
               $(this).css({
                animationName:""
               });
               setTimeout(()=>{
                   $(this).css(animation);
               },15);
               
            }
		});
	},
    previewPageAnimation: function() {
        var context=this;
		$('[data-animation-list]').each(function() {
            var animation_list_str = $(this).attr('data-animation-list');
            if(animation_list_str){
               var animation_list =context.deserialize(animation_list_str);
			  
			   var animations = animation_list.map((a)=>{ return context.animationConvert(a); });
			   $(this).css({
                animation:""
               });
               setTimeout(()=>{
                   $(this).css({animation:animations.join(',')});
               },10);
               
            }
		});
	},

	parseAnimationPropertys:function(animation){
        if(!animation) return;
        return {
            ...animation,
            animationDelay:animation.animationDelay+"s",
			animationDuration:animation.animationDuration+"s",
			animationIterationCount:animation.animationIterationCount==0?"infinite":animation.animationIterationCount,
        }
    },

	animationConvert:function(animation){
		if(!animation) return;

		animation = this.parseAnimationPropertys(animation);
		
		return animation.animationName +" "+animation.animationDuration+" "+animation.animationDelay+" "+animation.animationIterationCount;
	},

	serialize: function(obj) {
		var s = JSON.stringify(obj);
		s = s.replace(/"/g, "'");
		return s;
	},
	deserialize: function(s) {
		s = s.replace(/'/g, '"');
		return JSON.parse(s);
	}
};
