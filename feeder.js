function feeder(){

var feedAddresses = [
	"http://jtorn.wordpress.com/feed",
	"http://fraseraddison.wordpress.com/feed",
	"http://kmouse.wordpress.com/feed"];		

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
			feeds.push(result.feed); 
			console.log("Feed retrieved.");
		}
		else 
			console.log("Feed retrieval failed!");
		//console.log(JSON.stringify(feeds));
	}
		
}
}