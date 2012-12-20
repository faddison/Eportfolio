function feeder()
{

	var feedAddresses = [
		"http://jtorn.wordpress.com/feed",
		"http://fraseraddison.wordpress.com/feed",
		"http://kmouse.wordpress.com/feed"];		
		
	var count = 0;

	//google.load('feeds','1');
	google.load('feeds', '1', {callback : onGoogleReady});

	function onGoogleReady()
	{
		//var callback = populateRSSFeed('feed');
		var callback = getFeed();
		for (i = 0; i < feedAddresses.length; i++)
		{
			var address = feedAddresses[i];
			console.log("Retrieving feed from "+address+" ...");
			initializeRSSFeed(callback, address);
		}
	}

	google.setOnLoadCallback(onGoogleReady);

	function initializeRSSFeed(callback, targetFeed) 
	{
		var feed = new google.feeds.Feed(targetFeed);
		feed.load(callback);
	}

	function getFeed()
	{
		return function callback(result) 
		{
			if (!result.error)
			{
				console.log("Feed retrieved.");
				fireFeed(result.feed);
			}
			else 
				console.log("Feed retrieval failed!");
		}
	}
	
	function fireFeed(feed)
	{
		//console.log(feed);
		var event = new CustomEvent(
		"newFeed",
		{
			detail: {
				message: feed
			},
			bubbles: true,
			cancelable: true
		}
		);
		document.dispatchEvent(event);
	}
}