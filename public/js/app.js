$("#collapseNewUsers").on("click", () => {
    if (document.getElementById("newUsers").classList.contains("show")) {
        $("#newUsers").removeClass("show");
        $("#collapseNewUsers").removeClass("bottomRadius");
    } else {
        $("#newUsers").addClass("show");
        $("#collapseNewUsers").addClass("bottomRadius");
    }
});
