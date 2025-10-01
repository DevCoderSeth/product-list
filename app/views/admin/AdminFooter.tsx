"use client";

const AdminFooter = ({ className }: { className?: string }) => {
  return (
    <footer
      className={`hidden md:block w-full border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 py-4 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
        <span className="mb-2 sm:mb-0">
          All rights reserved by NetUganda LTD. 2025
        </span>
        <span>Version 1.0.0</span>
      </div>
    </footer>
  );
};

export default AdminFooter;
