import { context } from './../../utils/api/context';
import { permissions } from './../../utils/api/permissions';
import { ApolloServer } from "apollo-server-micro";
import { makeExecutableSchema } from "graphql-tools";
import { typeDefs } from "../../utils/api/typeDefs";
import { resolvers } from "../../utils/api/resolvers";
import Cors from "micro-cors";
import { log } from '../../utils/api/log';
import { applyMiddleware } from "graphql-middleware";
const cors = Cors();

const schema = applyMiddleware(makeExecutableSchema({
  typeDefs,
  resolvers,
}), log,
	// permissions
);
const apolloServer = new ApolloServer({
  schema
  ,context
});
const startServer = apolloServer.start();
export default cors(async function handler(req, res) {
	if(req.method==='OPTIONS')
	{
		res.status(200).send()
	}
	await startServer;
	await apolloServer.createHandler({
		path: '/api/graphql'
	})(req, res);
});

export const config = {
	api: {
		bodyParser: false,
	},
};

