var BASE_URL = "http://findclickprice.ru?url=";
var BUTTON_POPUP_HOVER_CLASS = "findclickHover_";
var BUTTON_POPUP_CSS = "background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAaRJREFUeNrMmG1LAkEQx9fTMM0eQMLoRQ9E9b4XfaX9TPexIqIQJXzRkxSFYOKdp87UnBzSrreduzsDf1bOvfPH/nd25iyJTIRhWIdhB7Qh/EYMGkgpv0sZuCYMTcErXssE14ChJfhFI6AP+4JplGH1As6ACLcpGEfFcP4R6MBgPibhJyjBDQ8a2gbE1a4b3lOj8ZQA70FfJha7igmoCroGHXMETCMCneeFDDztfVzNS9AeV8B0Jc/WnSS6GFHGZmMbtAuaKu7B0rqly+51AiJc+4/raOOVAjKiY6vr02I8Ul4031c57MEPXUPANUlYnYO1FeXQO+DhiuRycswIRQZfUA2fKVZv6AoQO52TpWsJaaZx8MkV4OQf9zxzLnUJtV4sAfFl7dZGw1o0MCnGoJu83XXF0Wrh77yTejZbft1zuopViUxafFuAb6BHrqUO99UD11qMDtyJ3z97WAKitX2u3YxVa4sCWre2KKB1a4sAOrE2C5gYVgUn1i4ApZRjg/kdV9YuWzzIOT8WjiMF7Gve/n1G/AMINk+pyxgxgkOW3lyAAQA0+FdBc0ndPwAAAABJRU5ErkJggg==);";
var BUTTON_POPUP_HOVER_STYLE = "." + BUTTON_POPUP_HOVER_CLASS + " {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAlpJREFUeNpiZEACM2fOVANS6gwDD54B8eX09PRfjFCHsQEpXyAWZhg84BcQb2aCctwHmeNAABRobkzA0AM5TJJhcAJeUAgqMAxiwMQwyAELKYobGhpi/gEBserZ2dl/iYqKvpSVlX1jZmZ2X1hY+AdNHfjq1Svpv3///iFFz6NHj+TPnj3LsHnzZlYtLa1zkZGRh0hxKN2iGOix35cvX9bt6OhIOn/+vMSgTYOfPn3iXLBgQeTdu3cFBm0m+fHjB9PixYt9B3UufvHihfjatWsNqJpJcAFDNSbm3jw2DnTxS3f+/Z246vev+8/+Y+T8/0Bw48YNFSDzAs0dKMDLyGitx4RhFkgsyp2ZTT3sx+f3n///R5d/+vSpyoBHMT83I2OCNwsbNjlgkfrn0KFDigOeBn1tmLHGFCiah3xVRxcHgjLLoHbgxsPYq0dGRkYmXl7e7wPqwIppv3/sP4vdgcDGxB9DQ8MXNC9mLtz699ej8OdXbOLYihcYALZy7tKloAY5Alco4QLMzMwsgYGBhwZlLgamPUYjI6MTysrKHwadA0GOU1VVvZWSknKQ6g1WSgEoWkEhR6zj6OJAkKO4uLg+SUhIPAWlOWKileoOBDbhP3h4eOzDJqetrf2cnL4I1RwICqHQ0NCthMqzAalJYLmRVo6j2IFCQkLvSUnwdHUgLGoHZWuGHlFLkQPpEbVkO5BeUUuuA+kWtWQ5kJ5Ri+zAz8QqTkxMXDkQfZIHDJDxYIKA1HqUKg4EjaQD6WODtFN3ixHGmjlzpgKQcmCADF4PBnAWGHhnAQIMAC681xc9GmTnAAAAAElFTkSuQmCC) !important;}";
var BUTTON_POPUP_ID = "findclick_";

function getSearchUrl(url) {
    return BASE_URL + url;
}

function getPopupStyle() {
    var style = "<style type='text/css'>";
    style += BUTTON_POPUP_HOVER_STYLE;
    var css = "position: fixed; z-index: 9999999; height: 40px; width: 40px; background-position: center center";
    css += "background-repeat: no-repeat; font-size: 14px; cursor: pointer; text-align: center; line-height: 45px; border-radius: 6px; cursor: pointer; transition: opacity 0.4s;";
    css += BUTTON_POPUP_CSS;
    style += "#" + BUTTON_POPUP_ID + " {" + css + "}";
    style += "</style>";
    return style;
}

function getElementCssStyle(elemTop, elemLeft) {
    var css = "";
    var top = elemTop + 15;
    css += "top: " + top + "px;";
    var left = elemLeft + 15;
    css += "left: " + left + "px;";
    return css;
}

function imageMouseOverEvent(img) {
    if (document.getElementById(BUTTON_POPUP_ID))
        return;

    var currentImage = img.currentTarget;

    var currentImageHtml = currentImage.outerHTML;

    var style = getElementCssStyle(currentImage.y, currentImage.x);
    var link = "<a href='" + getSearchUrl(currentImage.src) +  "' id='" + BUTTON_POPUP_ID + "' target='_blank' style='" + style + "'></a>";

    document.body.innerHTML = document.body.innerHTML + link;

    var imgPopup = document.getElementById(BUTTON_POPUP_ID);
    imgPopup.addEventListener("mouseover", imagePopupMouseOverEvent);
    imgPopup.addEventListener("mouseout", imagePopupMouseOutEvent);

    imageAddEvent();
}

function imagePopupMouseOverEvent(imgPopup) {
    imgPopup.currentTarget.className += " " + BUTTON_POPUP_HOVER_CLASS;
}

function imagePopupMouseOutEvent(imgPopup) {
    imgPopup.currentTarget.className = imgPopup.currentTarget.className.replace( /(?:^|\s)findclickHover_(?!\S)/ , '' )
}

function imageMouseOutEvent(img) {
    var currentImageEffect = document.getElementById(BUTTON_POPUP_ID);

    if (!currentImageEffect)
        return;

    currentImageEffect.parentNode.removeChild(currentImageEffect);
}
   
function imageAddEvent() {
    var imgs = document.images;
    for(img in imgs){
        if(imgs.hasOwnProperty(img)){
            imgs[img].addEventListener("mouseover", imageMouseOverEvent);
            imgs[img].addEventListener("mouseout", imageMouseOutEvent);
        }
    } 
}

function initializePlugin() {
    document.body.innerHTML = document.body.innerHTML + getPopupStyle();
    imageAddEvent();
}

window.onload = initializePlugin;