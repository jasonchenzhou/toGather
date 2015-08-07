//<script type="text/javascript">
    $(function(){
    	$('#attend').click(function(e){
    		e.preventDefault();
    		console.log("touch attend!!");

    		$.ajax({
    			type: 'POST',
    			contentType: 'application/json',
    			url: "/attend/<%= post.name %>/<%= post.time.day%>/<%= post.title %>/<%= post.loc %>/<%= post.partyDate %>/<%= user.name %>",
    			success: function(data){
    				console.log('ajax success');
    				//console.log(JSON.stringify(data));
    				alert(data);
    			}
    		});
    	});
    });
//</script>