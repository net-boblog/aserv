<%@ include file="../../common/edit.jsp" %>
<%
    element.before(new ScriptNode("<div class=\"divider\"></div>"));
    element.tagName("div");
    element.addClass("p");
    input.tagName("textarea");
    input.appendChild(new ScriptNode(input.attr("value")));
    input.removeAttr("value");
    input.removeAttr("size");
    input.attr("cols", KernelObject.getValue(field.getMetas().get("cols"), 87).toString());
    input.attr("rows", KernelObject.getValue(field.getMetas().get("cols"), 7).toString());
%>