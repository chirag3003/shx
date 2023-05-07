import { gql } from 'graphql-request';
import { client } from '../helpers';
import { IGistService, IPrivate } from '../interfaces/gists.interface';
import { UserMeta } from '../types';

export default class GistService implements IGistService {
	public async getGistS(gistKey: string, passkey?: string): Promise<any> {
		const query = gql`
			query getGist($gistKey: String!) {
				gists(where: { gist_url_key: { _eq: $gistKey } }) {
					gistID
					content
					gist_url_key
					created_on
					isPrivate
					isOneTimeOnly
					views
				}
			}
		`;
		const variables = {
			gistKey,
		};
		const result: any = await client.request(query, variables);
		if (result.gists.length === 0) {
			return null;
		} else {
			const gistData = result.gists[0];
			if (gistData.isOneTimeOnly) {
				const delQuery = gql`
					mutation deleteGist($gistKey: String!) {
						delete_gists(where: { gist_url_key: { _eq: $gistKey } }) {
							affected_rows
						}
					}
				`;
				const delVariables = {
					gistKey,
				};
				await client.request(delQuery, delVariables);
			} else {
				const updtViewQuery = gql`
					mutation updayeGist($gistKey: String!) {
						update_gists(
							where: { gist_url_key: { _eq: $gistKey } }
							_inc: { views: 1 }
						) {
							affected_rows
						}
					}
				`;
				const updtViewVariables = {
					gistKey,
				};
				await client.request(updtViewQuery, updtViewVariables);
			}
			if (gistData.passkey == passkey && gistData.isPrivate) {
				return null;
			} else {
				return gistData;
			}
		}
	}

	public async createGistS(
		content: string,
		meta: UserMeta,
		privateMeta: IPrivate,
		isOneTimeOnly = false
	): Promise<any> {
		const query = gql`
			mutation createGist($object: gists_insert_input!) {
				insert_gists_one(object: $object) {
					gistID
					content
					gist_url_key
					created_on
				}
			}
		`;
		const variables: any = {
			object: {
				apikeyUsed: meta.apiKeyID,
				content,
				creator_ip: meta.ip,
			},
		};

		variables.object = {
			...variables.object,
			isOneTimeOnly,
			content,
			isPrivate: privateMeta?.isPrivate ?? false,
			passkey: privateMeta.isPrivate ? privateMeta.passkey : null,
		};

		const result: any = await client.request(query, variables);
		return result.insert_gists_one;
	}
}
