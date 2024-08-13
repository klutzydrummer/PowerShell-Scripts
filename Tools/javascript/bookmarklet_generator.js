var templates = [
  {
    'title': 'IR SLA',
    'message': 'Hello,\n\n\nMy name is Brandon, and I am the tech that has been assigned your case. Please allow me to look over your case so that I am best equipped to help you.\n\n\nThank you,\nBrandon\nMicrosoft Teams CSS Support'
  },
];
var copyToClipboard = (text)=>{
    var textarea = document.createElement("textarea");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.value = text.replace("\n","\r\n");
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("Text copied to clipboard: " + text);
};
var javascript_js_template = "javascript:(()=>{    var text = '<REPLACE_ME>';    var textarea = document.createElement(&quot;textarea&quot;);    textarea.style.position = &quot;fixed&quot;;    textarea.style.opacity = &quot;0&quot;;    textarea.value = text.replace(&quot;\n&quot;,&quot;\r\n&quot;);    document.body.appendChild(textarea);    textarea.select();    document.execCommand(&quot;copy&quot;);    document.body.removeChild(textarea);    alert(&quot;Text copied to clipboard: &quot; + text);})();".replaceAll("\r\n","\n").replaceAll("\n","\\n");
output = [];
for (template of templates) {
  var bookmarklet_js = javascript_js_template.replace("<REPLACE_ME>", template.message.replaceAll("\n","\\n"));
  var bookmarklet_name = template.title;
  var bookmark_file_line = '            <DT><A HREF="' + bookmarklet_js + '" ADD_DATE="1723493830">' + bookmarklet_name + '</A>';
  output.push(bookmark_file_line);
}

var header = '<!DOCTYPE NETSCAPE-Bookmark-file-1>\n\x3C!-- This is an automatically generated file.\n     It will be read and overwritten.\n     DO NOT EDIT! -->\n<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">\n<TITLE>Bookmarks</TITLE>\n<H1>Bookmarks</H1>\n<DL><p>\n    <DT><H3 ADD_DATE="1711396610" LAST_MODIFIED="1723493802" PERSONAL_TOOLBAR_FOLDER="true">Favorites bar</H3>\n    <DL><p>\n        <DT><H3 ADD_DATE="1723493800" LAST_MODIFIED="1723493830">DFM Templates</H3>\n        <DL><p>\n';
var footer = '\n        </DL><p>\n    </DL><p>\n    <DT><A HREF="https://www.msn.com/en-us/money/personalfinance/it-saves-me-roughly-400-a-month-people-are-sharing-the-new-frugal-habits-that-they-actually-really-love/ar-BB1isaZy?ocid=entnewsntp&pc=U531&cvid=2675381e3d7749ee987a839807d7ae82&ei=32" ADD_DATE="1716567197" ICON="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABRElEQVQ4jc2TMW7bQBRE3yy/JBqGALuNO/tCuUAO4NJufYIgZW7kLmdIFwSIXdmWhMSAlzspdiUSNFKpyceSy4+dHcwMPrX5eGn2ZRtJmLzuFTymzzdfvueLzN12Q5YIgwXaX0kcWUcTBPZoAZva1b3YdkXUhTG2pgTS2BpaBkKCJEkVIZBALQBNFJAniowRdsYCe7AYbLIbrikZCdb9IqYOkCilBCcdyKdhyvqcKCa6OEAmFh5+fD10pUBKpKEUFup5KPe/VmxOXnjd/SEnkcos+dD177eRoJ2awoLgJ52/6YyrtGJXAtExt9D13M4tMGTSeTA8smRNzwc+sQRifh1i2D2PIdYIa4jdWRS0o/DGE5ktGb2niPbUUjuUcAV3QIcUCP5F4JkCMJYNyG109lPiA2ZCoImC+lYbpPl37eG/+pn+AgUclqcneOHnAAAAAElFTkSuQmCC">&quot;It Saves Me Roughly $400 A Month&quot;: People Are Sharing The New Frugal Habits That They Actually Really Love</A>\n</DL><p>';
var bookmarks_html_text = header + output.join("\n") + footer
copyToClipboard(bookmarks_html_text);