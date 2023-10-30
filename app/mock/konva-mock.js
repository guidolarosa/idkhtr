const defaultImageSize = 300;

export const initialObjects = [
  {
    text: "One is at the crest of the bubble; at this moment, well placed narrative flows combined with communities of influence (think tanks, large online collectives) can inject new narratives into the information system. Whereas previously, the media class (editors, writers, owners of media empires) decided what content was circulated, now, viral media contains the possibility for divergent frameworks to take hold.",
    fontSize: 18,
    type: "text",
    width: defaultImageSize,
    height: defaultImageSize,
    x: (window.innerWidth / 5) * 2.5 - defaultImageSize / 2,
    y: (window.innerHeight / 5) * 3,
  },
  {
    type: "image",
    x: window.innerWidth / 5 - defaultImageSize / 2,
    y: window.innerHeight / 5,
    width: defaultImageSize,
    height: defaultImageSize,
    url: "/1.png",
  },
  {
    type: "image",
    x: (window.innerWidth / 5) * 2.5 - defaultImageSize / 2,
    y: window.innerHeight / 5,
    width: defaultImageSize,
    height: defaultImageSize,
    url: "/2.png",
  },
  {
    type: "image",
    x: (window.innerWidth / 5) * 4 - defaultImageSize / 2,
    y: window.innerHeight / 5,
    width: defaultImageSize,
    height: defaultImageSize,
    url: "/3.png",
  },
  {
    type: "image",
    x: window.innerWidth / 5 - defaultImageSize / 2,
    y: (window.innerHeight / 5) * 3,
    width: defaultImageSize,
    height: defaultImageSize,
    url: "/4.png",
  },
  {
    type: "image",
    x: (window.innerWidth / 5) * 4 - defaultImageSize / 2,
    y: (window.innerHeight / 5) * 3,
    width: defaultImageSize,
    height: defaultImageSize,
    url: "/5.png",
  },
];