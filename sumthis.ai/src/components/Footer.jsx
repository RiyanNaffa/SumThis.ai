const Footer = () => {
  return (
    <footer className="bottom-0 left-0 w-full bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} SumThis.AI. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Made with ❤️ by the SumThis.AI Team
        </p>
      </div>
    </footer>
  );
}

export default Footer;