// api/pages/[slug].js
const pages = {
  'home': {
    title: "Emon Finance Ltd Ltd. - Premium Performance Marketing Network",
    content: "Connect with premium advertisers and publishers..."
  },
  'advertisers': {
    title: "Advertiser Solutions",
    content: "Scale your customer acquisition..."
  },
  // Add all your other pages here
};

export default function handler(req, res) {
  const { slug } = req.query;
  const pageData = pages[slug] || {
    title: "Page Not Found",
    content: "The requested page does not exist."
  };
  
  res.status(200).json(pageData);
}