export type PublicationData = {
	text: string;
	media: string;
};

export type Publication = {
	pubDate: string;
	data: PublicationData[];
};

export type PublicationList = {
	tasks: Publication[];
};
