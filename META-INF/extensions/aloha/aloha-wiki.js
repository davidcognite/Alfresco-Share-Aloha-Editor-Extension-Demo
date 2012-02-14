/* 
 *
 * This function runs when the Aloha editor is ready and binds it to the appropriate DOM elements.
 * It also listens for the event that is triggered when editing is finished and posts the modifications back to Alfresco.
 *
 */
 
Aloha.ready( function()
{
   var wiki = Alfresco.util.ComponentManager.findFirst("Alfresco.WikiPage"),
      $ = Aloha.jQuery;
   if (wiki.options.permissions.edit)
   {
      $("a.tabLabel[href$=edit]").next().andSelf().hide();
      var wikiContent = $("div.rich-content");
      wikiContent.aloha();
      Aloha.bind( 'aloha-editable-deactivated', function ( event, params )
      {
         // Save the results to Alfresco.
         var version = wiki.options.versions[wiki.options.versions.length -1];
         Alfresco.util.Ajax.jsonPut(
         {
            url: Alfresco.constants.PROXY_URI + "slingshot/wiki/page/" + Alfresco.constants.SITE + "/" + version.title,
            dataObj:
            {
               context: Alfresco.constants.URL_PAGECONTEXT + "site/" + Alfresco.constants.SITE + "/wiki-page?title=" + version.title,
               currentVersion: version.label,
               forceSave: true,
               page: "wiki-page",
               pagecontent: wikiContent[0].innerHTML,
               tags: wiki.options.tags
            }
         })
      });
   }
});