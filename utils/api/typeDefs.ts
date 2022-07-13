import { gql } from "apollo-server-micro";

export const typeDefs = gql`
type Feed{
	id:String
	name:String 
	url:String
author:User
tags:[FeedTag]
bundles:[Bundle]
}
type Bundle{
	id:String
	name:String
	description:String
author:User
tags:[BundleTag]
feeds:[feed]
}

type User{
	id:String
	auth0:String
	nickname: String
	picture:String
	bundles:[Bundle]
	feeds:[Feed]

}
type FeedTag{
	id:String
	name:String
	feeds:[Feed]
}

type BundleTag{
	id:String
	name:String
	bundles:[Bundle]
}
input FeedInput{
	id:String
} 
input BundleInput{
	id:String
}
input FeedCreateInput{
	id:String
	url:String
	name:String
	tags:NestedFeedTagCreateInput
}
input NestedFeedTagCreateInput{
	create:[FeedTagCreateInput]
	connect:[FeedTagWhereUniqueInput]
}
input FeedTagCreateInput{
	id:String

	name:String
}
input FeedTagWhereUniqueInput{
	id:String
	name:String 
}

input BundleCreateInput{
	id:String
	name:String
	description:String
}
type Query{
	hello:String
	feed(data:FeedInput):Feed
	bundle(data:BundleInput):Bundle
	feeds:[Feed]
	bundles:[Bundle]
}
type Mutation{
	createFeed(data:FeedCreateInput):Feed
	createBundle(data:BundleCreateInput):Bundle
}
`