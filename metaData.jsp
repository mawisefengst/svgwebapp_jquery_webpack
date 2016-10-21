<%
	
	  String currentUri = request.getScheme() + "://" + request.getServerName()  + request.getContextPath();

	  List<String> metaData1 = new ArrayList<String>();
	  metaData1.add( currentUri + "/images/share/alaska_doe_ak.jpg");
	  metaData1.add("Share Title 1");
	  metaData1.add("Share description 1");
	  map.put("1",metaData1);


	
%>