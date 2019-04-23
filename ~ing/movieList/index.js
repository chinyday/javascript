$(document).ready(function(){
    
    // 
    jQuery('.gnb li').on('click', function() {
       jQuery(this).addClass('on').siblings('li').removeClass('on');
    });

    // 
    jQuery('.comingup_div').on('click', '.m_box', function() {
        if(jQuery(this).hasClass('on')){
            jQuery(this).removeClass('on');
        }else{
            jQuery(this).addClass('on').siblings().removeClass('on');
        }
     });  

     jQuery('.toprated_div').on('click', '.m_box', function() {
        if(jQuery(this).hasClass('on')){
            jQuery(this).removeClass('on');
        }else{
            jQuery(this).addClass('on').siblings().removeClass('on');
        }
     });  

     jQuery('.popular_div').on('click', '.m_box', function() {
        if(jQuery(this).hasClass('on')){
            jQuery(this).removeClass('on');
        }else{
            jQuery(this).addClass('on').siblings().removeClass('on');
        }
     });  

     jQuery('.trending_div').on('click', '.m_box', function() {
        if(jQuery(this).hasClass('on')){
            jQuery(this).removeClass('on');
        }else{
            jQuery(this).addClass('on').siblings().removeClass('on');
        }
     });  
     
     
});