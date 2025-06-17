const mongoose = require('mongoose');
const { Schema } = mongoose;

// Sub-schema for the "addata" field under "pnx"
const PnxAdDataSchema = new Schema({
    abstract: [String],
    orcidid: [String],
    issn: [String],
    oa: [String],
    jtitle: [String],
    genre: [String],
    au: [String],
    atitle: [String],
    stitle: [String],
    date: [String],
    risdate: [String],
    volume: [String],
    issue: [String],
    eissn: [String],
    ristype: [String],
    cop: [String],
    pub: [String],
    doi: [String],
    format: [String]
}, { _id: false });

// Sub-schema for the "links" field under "pnx"
const PnxLinksSchema = new Schema({
    openurl: [String],
    linktorsrc: [String],
    thumbnail: [String],
    linktopdf: [String],
    linktohtml: [String],
    openurlfulltext: [String]
}, { _id: false });

// Sub-schema for the "search" field under "pnx"
const PnxSearchSchema = new Schema({
    sourceid: [String],
    recordid: [String],
    recordtype: [String],
    title: [String],
    creator: [String],
    creationdate: [String],
    subject: [String],
    rsrctype: [String],
    startdate: [String],
    enddate: [String],
    scope: [String],
    creatorcontrib: [String],
    orcidid: [String],
    issn: [String],
    fulltext: [String],
    addtitle: [String],
    general: [String],
    description: [String]
}, { _id: false });

// Sub-schema for the "delivery" field under "pnx"
const PnxDeliverySchema = new Schema({
    fulltext: [String],
    delcategory: [String]
}, { _id: false });

// Sub-schema for the "display" field under "pnx"
const PnxDisplaySchema = new Schema({
    type: [String],
    title: [String],
    source: [String],
    creator: [String],
    publisher: [String],
    ispartof: [String],
    identifier: [String],
    language: [String],
    rights: [String],
    snippet: [String],
    lds50: [String],
    oa: [String],
    description: [String],
    subject: [String],
    keyword: [String]
}, { _id: false });

// Sub-schema for the "facets" field under "pnx"
const PnxFacetsSchema = new Schema({
    creationdate: [String],
    language: [String],
    rsrctype: [String],
    creatorcontrib: [String],
    topic: [String],
    prefilter: [String],
    collection: [String],
    toplevel: [String],
    frbrgroupid: [String],
    frbrtype: [String],
    jtitle: [String]
}, { _id: false });

// Sub-schema for the "sort" field under "pnx"
const PnxSortSchema = new Schema({
    title: [String],
    creationdate: [String],
    author: [String]
}, { _id: false });

// Sub-schema for the "control" field under "pnx"
const PnxControlSchema = new Schema({
    sourcerecordid: [String],
    originalsourceid: [String],
    sourceid: [String],
    recordid: [String],
    recordtype: [String],
    addsrcrecordid: [String],
    sourcetype: [String],
    sourceformat: [String],
    sourcesystem: [String],
    iscdi: [String],
    score: [String]
}, { _id: false });

// Main "pnx" schema
const PnxSchema = new Schema({
    addata: PnxAdDataSchema,
    links: PnxLinksSchema,
    search: PnxSearchSchema,
    delivery: PnxDeliverySchema,
    display: PnxDisplaySchema,
    facets: PnxFacetsSchema,
    sort: PnxSortSchema,
    control: PnxControlSchema
}, { _id: false });

// Schema for the top-level "delivery" field
const DeliverySchema = new Schema({
    link: [{
        '@id': { type: String },
        linkType: { type: String },
        linkURL: { type: String },
        displayLabel: { type: String }
    }],
    deliveryCategory: [String],
    availability: [String],
    displayLocation: Boolean,
    additionalLocations: Boolean,
    physicalItemTextCodes: String,
    feDisplayOtherLocations: Boolean,
    displayedAvailability: String,
    holding: [String],
    almaOpenurl: String
}, { _id: false });

// Schema for the "extras" field
const ExtrasSchema = new Schema({
    citationTrails: {
        citing: [String],
        citedby: [String]
    },
    timesCited: Schema.Types.Mixed
}, { _id: false });

// Define the main schema and name it HCISerendipitySchema.
// Note: Since Mongo keys cannot start with '@', the original "@id" is stored as "externalId" with a virtual.
const HCISerendipitySchema = new Schema({
    pnx: PnxSchema,
    delivery: DeliverySchema,
    context: String,
    adaptor: String,
    extras: ExtrasSchema,
    externalId: { type: String }
}, { timestamps: true });

// Create a virtual field for "@id"
HCISerendipitySchema.virtual('@id').get(function() {
    return this.externalId;
});

HCISerendipitySchema.set('toJSON', { virtuals: true });
HCISerendipitySchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('HCISerendipity', HCISerendipitySchema);
