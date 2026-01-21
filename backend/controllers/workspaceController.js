const asyncHandler = require('express-async-handler')
const Workspace = require('../models/workspaceModel')
const Query = require('../models/queryModel')
const ObjectId = require('mongoose').Types.ObjectId;
const mongoose = require('mongoose');
const Document = require('../models/documentModel')

/**
 * @desc Get workspaces all_users
 * @route GET /api/workspaces
 * @params {req, res} - The request and response object.
 * @returns {object} - success state and lists of workspace.
 */
const getWorkspaces = asyncHandler(async (req, res) => {
    const workspaces = await Workspace.find()
    res.status(200).json({ success: true, data: workspaces });
})

/**
* @desc Get workspace by user_id
* @route GET /api/workspaces/user/:userId
* @params {req, res} - The request and response object.
* @returns {object} - success state and lists of workspace.
*/
const getWorkspaceByUserId = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    console.log('userId', userId)
    try {
        const workspaceLists = await Workspace.aggregate([
            {
                $match: {
                    userId: new ObjectId(userId),
                    archive: true
                }
            },
            {
                $lookup: {
                  from: 'queries',
                  let: {
                    wId: '$_id'
                  },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ['$workspaceId', '$$wId']
                        }
                      }
                    },
                    {
                      $lookup: {
                        from: 'documents',
                        let: { qId: '$_id' },
                        pipeline: [
                          {
                            $match: {
                              $expr: { $eq: ['$queryId', '$$qId'] }
                            }
                          },
                          {
                            $count: "docSize"
                          },
                          {
                            $project:{
                              docSize: 1
                            }
                          }
                        ],
                        as: 'docs'
                      }
                    },
                    { $unwind: { 
                        path:'$docs' , 
                        preserveNullAndEmptyArrays: true
                      } 
                    },
                    {
                      "$group": {
                        "_id": null,
                        total: { $sum: 1 },
                        "docCount": {
                          "$sum": "$docs.docSize"
                        }
                      }
                    }
                  ],
                  as: 'queries'
                }
              },
              {
                $addFields: {
                  querySize: { $arrayElemAt: ["$queries.total", 0] },
                  docSize: { $arrayElemAt: ["$queries.docCount", 0] }
                }
              },
        ]);

        res.status(200).json({ success: true, data: workspaceLists });
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

const getWorkspaceByUserId2 = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    
    const workspaceLists = await Workspace
        .find({ userId: userId, parentId: null })
    
    if (!workspaceLists || workspaceLists.length === 0) {
      return res.status(404).json({ success: false, error: "No workspace found for the user" });
    }

    res.status(200).json({ success: true, data: workspaceLists });        
})

/**
* @desc Get all workspace and documents
* @route GET /api/workspaces/user/:userId
* @params {req, res} - The request and response object.
* @returns {object} - success state and lists of workspace.
*/
const getWorkspaceCollections = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  try {
      const workspaces = await Workspace.aggregate([
          {
              $match: {
                  userId: new ObjectId(userId),
                  archive: true 
              }
          },
          {
              $lookup: {
                  from: 'queries',
                  let: { wId: '$_id' },
                  pipeline: [
                      {
                          $match: {
                              $expr: { $eq: ['$workspaceId', '$$wId'] }
                          }
                      },
                      {
                          $lookup: {
                              from: 'documents',
                              let: { qId: '$_id' },
                              pipeline: [
                                  {
                                      $match: {
                                          $expr: { $eq: ['$queryId', '$$qId'] }
                                      }
                                  },
                                  {
                                      $project: {
                                          title: 1,
                                          doc_abstract: 1
                                      }
                                  }
                              ],
                              as: 'docs'
                          }
                      },
                      {
                          $group: {
                              _id: '$_id',
                              documents: { $push: '$docs' }
                          }
                      }
                  ],
                  as: 'queries'
              }
          }
      ]);

      // const folders = {};
      // console.log('wp_collections x: ', workspaces)

      // for()
      // workspaces.forEach(workspace => {
      //   const documentTitles = [];
      //   workspace.queries.forEach(query => {
      //       query.documents.forEach(docs => {
      //           documentTitles.push(...docs); 
      //       });
      //   });        
      //   folders[workspace.name] = documentTitles;
      // });

      // res.status(200).json({ success: true, data: folders });
      const data = workspaces.map(workspace => {
        const documents = [];
        workspace.queries.forEach(query => {            
            query.documents.forEach(docs => {
                
                docs.forEach(doc => {
                    documents.push({ title: doc.title, abstract: doc.doc_abstract });
                });
            });
        });
        return {
            id: workspace._id,
            [workspace.name]: documents
        };
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
});

/**
* @desc Get archives by user_id
* @route GET /api/workspaces/archives/user/:userId
* @params {req, res} - The request and response object.
* @returns {object} - success state and lists of workspace.
*/
const getArchivesByUserId = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    console.log('userId', userId)
    try {
        const workspaceLists = await Workspace.aggregate([
            {
                $match: {
                    userId: new ObjectId(userId),
                    archive: false
                }
            },
            {
                $lookup: {
                  from: 'queries',
                  let: {
                    wId: '$_id'
                  },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ['$workspaceId', '$$wId']
                        }
                      }
                    },
                    {
                      $lookup: {
                        from: 'documents',
                        let: { qId: '$_id' },
                        pipeline: [
                          {
                            $match: {
                              $expr: { $eq: ['$queryId', '$$qId'] }
                            }
                          },
                          {
                            $count: "docSize"
                          },
                          {
                            $project:{
                              docSize: 1
                            }
                          }
                        ],
                        as: 'docs'
                      }
                    },
                    { $unwind: { 
                        path:'$docs' , 
                        preserveNullAndEmptyArrays: true
                      } 
                    },
                    {
                      "$group": {
                        "_id": null,
                        total: { $sum: 1 },
                        "docCount": {
                          "$sum": "$docs.docSize"
                        }
                      }
                    }
                  ],
                  as: 'queries'
                }
              },
              {
                $addFields: {
                  querySize: { $arrayElemAt: ["$queries.total", 0] },
                  docSize: { $arrayElemAt: ["$queries.docCount", 0] }
                }
              },
        ]);

        res.status(200).json({ success: true, data: workspaceLists });
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

/**
* @desc Create workspace
* @route POST /api/workspaces/
* @params {req, res} - The request and response object.
* @return {object} - success state and workspace object.
*/
const createWorkspace = asyncHandler(async (req, res) => {    
    if(!req.body.name) {
        res.status(400)
        throw new Error('Please add a workspace name field')
    }

    const { name, userId, queryName } = req.body;
    const workspace = await Workspace.create({name, userId})

    // create first query as same as the workspace name
    const queryData = {
        query: queryName, 
        userId: userId,
        workspaceId: workspace._id,
        workspaceName: workspace.name,
        documents: []
    };
    const newQueryData = await Query.create(queryData);

    res.status(201).json({ success: true, data: { workspace, queries: [newQueryData] } });
})

/**
 * @desc Get workspace details
 * @route GET /api/workspaces/:workspaceId
 * @params {req, res} - The request and response object.
 * @return {object} - success state and workspace detail object.
 */
const getWorkspaceDetail = asyncHandler(async (req, res) => {

    const { workspaceId } = req.params;

    try {
        const workspace = await Workspace.findById(workspaceId);               

        if (!workspace) {
            return res.status(404).json({ success: false, error: 'Workspace not found' });
        }

        // Get queries from ALL workspaces instead of just the current workspace
        // const queries = await Query.find({ workspaceId });
        // Get queries from ALL workspaces instead of just the current workspace      // getting query of just current workspace
        const queries = await Query.find({});
        const querySize = queries.length;
        const docSize = await Document.countDocuments({ queryId: { $in: queries.map(query => query._id) } });

        const processedQueries = await Promise.all(queries.map(async query => {            
            const documents = await Document.find({ queryId: query._id }).sort({ createdAt: -1 });            
            return { ...query.toObject(), documents };
        }));

        const reversedQueries = processedQueries.reverse();

        res.status(200).json({ success: true, data: { workspace, querySize, docSize, queries: reversedQueries } });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
})

/**
 * @desc Update workspace by Id
 * @route PUT /api/workspaces
 */
const updateWorkspace = asyncHandler(async (req, res) => {
    const { name, archive, userId } = req.body;
    const workspace = await Workspace.findById(req.params.id)    

    if(!workspace) {
        res.status(400)
        throw new Error('Workspace not found')
    }

    if(workspace.userId.toString() !== userId){
        res.status(403)
        throw new Error('User not authorized to update. Check user id.')
    }
    
    if (name !== undefined) workspace.name = name;
    if (archive !== undefined) workspace.archive = archive;

    const updatedWorkspace = await workspace.save();

    res.status(200).json(updatedWorkspace);
})

/**
 * @desc Delete workspace by Id
 * @route DELETE /api/workspaces
 */
const deleteWorkspace = asyncHandler(async (req, res) => {
    const workspace = await Workspace.findById(req.params.id)

    if(!workspace) {
        res.status(400)
        throw new Error('Workspace not found')
    }

    const deletedWorspace = await Workspace.findByIdAndDelete(req.params.id)

    res.status(200).json({id: req.params.id})
})

/**
 * @desc Create new query
 * @route POST /api/workspaces/query/
 * @params {req, res} - The request and response object.
 * @return {object} - success state and query object.
 */
const createQuery = async (req, res) => {
    try {
        const { query, userId, workspaceId, workspaceName, documents } = req.body;
        
        const workspace = await Workspace.findById(workspaceId);               

        if (!workspace) {
            res.status(404).json({ success: false, error: 'Workspace not found' });
            return;
        }

        // Create new query
        const newQuery = await Query.create({ query, userId, workspaceId, workspaceName, documents });        

        res.status(201).json({ success: true, data: newQuery });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getQuery = async (req, res) => {
    const { workspaceId, queryId } = req.params;
    
    try {
        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ success: false, error: 'Workspace not found' });
        }

        const queries = await Query.find({ workspaceId });
        console.log(queries)

        const queryObjectId = new ObjectId(queryId);
        const query = queries.find(q => q._id.equals(queryObjectId));
        console.log('queryObjectId', queryObjectId);
        console.log('selected query', query);
        if (!query) {
            return res.status(404).json({ success: false, error: 'Query does not exist' });
        }        

        const doc = await Document.find({queryId})

        query.documents = doc 

        res.status(200).json({ success: true, data: { query } });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: error.message });
    }
};

const getQueryIdsLists = async (req, res) => {
    const { workspaceId } = req.params;
    
    try {
        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ success: false, error: 'Workspace not found' });
        }

        const queries = await Query.find({ workspaceId });
        console.log('*** ',queries)        
        const queryIds = queries.map(query => query._id);

        res.status(200).json({ success: true, data: { queryIds } });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: error.message });
    }
};

const getDocumentByQuery = async (req, res) => {
    const { workspaceId, queryId } = req.params;
    
    try {
        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ success: false, error: 'Workspace not found' });
        }

        const queries = await Query.find({ workspaceId });        

        const processedQueries = await Promise.all(queries.map(async query => {            
            const documents = await Document.find({ queryId: query._id });                        
            return documents;
        }));

        const flattenedProcessedQueries = processedQueries.flat();

        res.status(200).json({ success: true, data: flattenedProcessedQueries });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: error.message });
    }
};


module.exports = {
    getWorkspaces,
    createWorkspace,
    updateWorkspace,
    deleteWorkspace,
    getWorkspaceByUserId,
    getWorkspaceDetail,
    createQuery,
    getQuery,
    getDocumentByQuery,
    getQueryIdsLists,
    getWorkspaceCollections,
    getArchivesByUserId
}