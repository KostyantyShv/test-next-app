"use client";
import React, {
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  FormEvent,
} from "react";
import Image from "next/image";

interface Badge {
  text: string;
}

interface SocialMedia {
  type: string;
  url: string;
}

interface FormData {
  avatar: string;
  badges: string[];
  contact: {
    joinedDate: string;
    location: string;
    website: string;
    phone: string;
  };
  social: SocialMedia[];
  expertise: string[];
}

const About: React.FC = () => {
  const [avatarSrc, setAvatarSrc] = useState<string>(
    "https://i.ibb.co/YP71Tb6/profile9.jpg"
  );
  const [badges, setBadges] = useState<Badge[]>([
    { text: "Advanced Chemistry Expert" },
    { text: "Research Publication Lead" },
    { text: "Department Head" },
  ]);
  const [newBadge, setNewBadge] = useState<string>("");

  const [contactInfo, setContactInfo] = useState({
    joinedDate: "Dec 15, 2024",
    location: "Boston, MA",
    website: "www.example.com",
    phone: "+1 (555) 123-4567",
  });

  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([
    { type: "twitter", url: "https://twitter.com/example" },
    { type: "linkedin", url: "https://linkedin.com/in/example" },
    { type: "facebook", url: "https://facebook.com/example" },
    { type: "instagram", url: "https://instagram.com/example" },
  ]);

  const [newSocialType, setNewSocialType] = useState<string>("");
  const [newSocialUrl, setNewSocialUrl] = useState<string>("");

  const [expertise, setExpertise] = useState<string[]>([
    "Organic Chemistry",
    "Chemical Processing",
    "Research Methods",
    "Lab Management",
    "Academic Publishing",
    "Student Mentoring",
    "Industry Collaboration",
  ]);

  const [newTag, setNewTag] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setAvatarSrc(e.target.result as string);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleAddBadge = () => {
    if (newBadge.trim()) {
      setBadges([...badges, { text: newBadge.trim() }]);
      setNewBadge("");
    }
  };

  const handleRemoveBadge = (index: number) => {
    const newBadges = [...badges];
    newBadges.splice(index, 1);
    setBadges(newBadges);
  };

  const handleContactChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setContactInfo({
      ...contactInfo,
      [id]: value,
    });
  };

  const handleAddSocial = () => {
    if (newSocialType && newSocialUrl.trim()) {
      // Check if already exists
      const exists = socialMedia.some((item) => item.type === newSocialType);

      if (!exists) {
        // Add https:// if missing
        let formattedUrl = newSocialUrl.trim();
        if (!/^https?:\/\//i.test(formattedUrl)) {
          formattedUrl = "https://" + formattedUrl;
        }

        setSocialMedia([
          ...socialMedia,
          { type: newSocialType, url: formattedUrl },
        ]);
        setNewSocialType("");
        setNewSocialUrl("");
      } else {
        alert(
          `${socialLabels[newSocialType]} is already added. Remove it first if you want to change it.`
        );
      }
    } else {
      if (!newSocialType) {
        alert("Please select a social media platform.");
      } else if (!newSocialUrl) {
        alert("Please enter a profile URL.");
      }
    }
  };

  const handleRemoveSocial = (index: number) => {
    const newSocialMedia = [...socialMedia];
    newSocialMedia.splice(index, 1);
    setSocialMedia(newSocialMedia);
  };

  const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (newTag.trim()) {
        setExpertise([...expertise, newTag.trim()]);
        setNewTag("");
      }
    }
  };

  const handleRemoveTag = (index: number) => {
    const newExpertise = [...expertise];
    newExpertise.splice(index, 1);
    setExpertise(newExpertise);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Collect all data
    const formData: FormData = {
      avatar: avatarSrc,
      badges: badges.map((badge) => badge.text),
      contact: {
        joinedDate: contactInfo.joinedDate,
        location: contactInfo.location,
        website: contactInfo.website,
        phone: contactInfo.phone,
      },
      social: socialMedia,
      expertise: expertise,
    };

    // Here you could send this data to a server
    console.log("Form data to be saved:", formData);
    alert("Changes saved successfully!");
  };

  const socialLabels: Record<string, string> = {
    twitter: "Twitter (X)",
    linkedin: "LinkedIn",
    facebook: "Facebook",
    instagram: "Instagram",
    youtube: "YouTube",
    tiktok: "TikTok",
  };

  const formatUrl = (url: string): string => {
    // Remove protocol prefix for display
    return url.replace(/^https?:\/\/(www\.)?/i, "");
  };

  return (
    <div className="py-6 w-full flex justify-center">
      <div className="w-full flex max-md:flex-col gap-6">
        <div className="max-w-[350px] max-md:px-6">
          <h1 className="text-2xl font-semibold text-[#464646] mb-3">About</h1>
          <p className="text-[#5F5F5F] text-base leading-relaxed">
            Share information about your institution, qualifications, and areas
            of expertise to establish credibility and build connections with
            your audience.
          </p>
        </div>

        <div className="w-full bg-white rounded-lg shadow-[0_1px_3px_rgba(0,_0,_0,_0.1)] p-8 relative">
          <form onSubmit={handleSubmit}>
            {/* Profile Avatar Section */}
            <div className="mb-7">
              <h2 className="text-lg font-semibold text-[#464646] mb-4 pb-2 border-b border-[#EBFCF4]">
                Profile Avatar
              </h2>
              <div className="flex items-start max-md:flex-col max-md:w-full max-md:items-center gap-4 mt-2">
                <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-4 border-white shadow-md">
                  <Image
                    src={avatarSrc}
                    alt="Profile Avatar"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="max-md:flex max-md:flex-col max-md:w-full max-md:items-center">
                  <button
                    type="button"
                    className="py-2 px-4 bg-[#f5f5f5] border border-[#ddd] rounded text-sm cursor-pointer transition-all duration-200 hover:bg-[#eee]"
                    onClick={handleAvatarUpload}
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block align-middle mr-1.5"
                    >
                      <path
                        fill="#4A4A4A"
                        d="M11 14.9861C11 15.5384 11.4477 15.9861 12 15.9861C12.5523 15.9861 13 15.5384 13 14.9861V7.82831L16.2428 11.0711C16.6333 11.4616 17.2665 11.4616 17.657 11.0711C18.0475 10.6806 18.0475 10.0474 17.657 9.65692L12.7071 4.70701C12.3166 4.31649 11.6834 4.31649 11.2929 4.70701L6.34315 9.65692C5.95262 10.0474 5.95262 10.6806 6.34315 11.0711C6.73367 11.4616 7.36684 11.4616 7.75736 11.0711L11 7.82831V14.9861Z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>
                      <path
                        fill="#4A4A4A"
                        d="M3 14C3 13.4477 3.44772 13 4 13C4.55228 13 5 13.4477 5 14V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V14C19 13.4477 19.4477 13 20 13C20.5523 13 21 13.4477 21 14V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V14Z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                    Choose Image
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                  <div className="mt-2 text-[#5F5F5F] text-xs">
                    Recommended size: 250x250 pixels
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements/Badges Section */}
            <div className="mb-7">
              <h2 className="text-lg font-semibold text-[#464646] mb-4 pb-2 border-b border-[#EBFCF4]">
                Achievements/Badges
              </h2>
              <div className="flex flex-wrap gap-2">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-[#EBFCF4] text-[#016853] py-1.5 px-3 rounded-full text-sm"
                  >
                    <span>{badge.text}</span>
                    <span
                      className="cursor-pointer text-[#016853] text-sm font-semibold"
                      onClick={() => handleRemoveBadge(index)}
                    >
                      &times;
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-3">
                <input
                  type="text"
                  value={newBadge}
                  onChange={(e) => setNewBadge(e.target.value)}
                  className="w-full py-2.5 px-3 border border-[#ddd] rounded text-sm"
                  placeholder="Add new achievement badge"
                />
                <button
                  type="button"
                  onClick={handleAddBadge}
                  className="py-2 px-4 bg-[#EBFCF4] text-[#016853] rounded text-sm font-semibold cursor-pointer hover:bg-[#D7F7E9]"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="mb-7">
              <h2 className="text-lg font-semibold text-[#464646] mb-4 pb-2 border-b border-[#EBFCF4]">
                Contact Information
              </h2>
              <div className="flex max-md:flex-col gap-4 mb-4">
                <div className="flex-1">
                  <label className="block font-semibold text-sm mb-2 text-[#5F5F5F]">
                    Joined Date
                  </label>
                  <input
                    type="text"
                    id="joinedDate"
                    value={contactInfo.joinedDate}
                    className="w-full py-2.5 px-3 border border-[#ddd] rounded text-sm bg-[#f8f9fa] cursor-not-allowed text-[#5F5F5F]"
                    readOnly
                  />
                </div>
                <div className="flex-1">
                  <label className="block font-semibold text-sm mb-2 text-[#4A4A4A]">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={contactInfo.location}
                    onChange={handleContactChange}
                    className="w-full py-2.5 px-3 border border-[#ddd] rounded text-sm focus:outline-none focus:border-[#016853] focus:shadow-[0_0_0_2px_rgba(1,104,83,0.1)]"
                  />
                </div>
              </div>
              <div className="flex max-md:flex-col gap-4">
                <div className="flex-1">
                  <label className="block font-semibold text-sm mb-2 text-[#4A4A4A]">
                    Website
                  </label>
                  <input
                    type="text"
                    id="website"
                    value={contactInfo.website}
                    onChange={handleContactChange}
                    className="w-full py-2.5 px-3 border border-[#ddd] rounded text-sm focus:outline-none focus:border-[#016853] focus:shadow-[0_0_0_2px_rgba(1,104,83,0.1)]"
                  />
                </div>
                <div className="flex-1">
                  <label className="block font-semibold text-sm mb-2 text-[#4A4A4A]">
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    value={contactInfo.phone}
                    onChange={handleContactChange}
                    className="w-full py-2.5 px-3 border border-[#ddd] rounded text-sm focus:outline-none focus:border-[#016853] focus:shadow-[0_0_0_2px_rgba(1,104,83,0.1)]"
                  />
                </div>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="mb-7">
              <h2 className="text-lg font-semibold text-[#464646] mb-4 pb-2 border-b border-[#EBFCF4]">
                Social Media
              </h2>
              <div className="flex flex-wrap gap-3">
                {socialMedia.map((social, index) => (
                  <div
                    key={index}
                    className="flex items-center max-md:justify-between max-md:w-full gap-2 bg-[#f5f5f5] py-2 px-3 rounded text-sm"
                  >
                    <div>
                      <span className="text-[#4A4A4A] font-semibold">
                        {socialLabels[social.type]}
                      </span>
                      <span className="text-[#346DC2] text-sm ml-1">
                        {formatUrl(social.url)}
                      </span>
                    </div>
                    <span
                      className="cursor-pointer text-[#5F5F5F] text-sm"
                      onClick={() => handleRemoveSocial(index)}
                    >
                      &times;
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-3 max-md:flex-col">
                <select
                  value={newSocialType}
                  onChange={(e) => setNewSocialType(e.target.value)}
                  className="w-1/3 max-md:w-full py-2 px-3 border border-[#ddd] rounded text-sm bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2024%2024%27%20fill%3D%27%235F5F5F%27%20width%3D%2718px%27%20height%3D%2718px%27%3E%3Cpath%20d%3D%27M7%2010l5%205%205-5z%27%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_10px_center] pr-8 appearance-none"
                >
                  <option value="">-- Select Social Media --</option>
                  <option value="twitter">Twitter (X)</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="youtube">YouTube</option>
                  <option value="tiktok">TikTok</option>
                </select>
                <input
                  type="text"
                  value={newSocialUrl}
                  onChange={(e) => setNewSocialUrl(e.target.value)}
                  className="flex-1 py-2 px-3 border border-[#ddd] rounded text-sm"
                  placeholder="Enter profile URL"
                />
                <div className="max-md:flex max-md:w-full justify-end">
                  <button
                    type="button"
                    onClick={handleAddSocial}
                    className="py-2 px-4 w-fit bg-[#EBFCF4] text-[#016853] rounded text-sm font-semibold cursor-pointer hover:bg-[#D7F7E9]"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Areas of Expertise Section */}
            <div className="mb-7">
              <h2 className="text-lg font-semibold text-[#464646] mb-4 pb-2 border-b border-[#EBFCF4]">
                Areas of Expertise
              </h2>
              <div className="flex max-md:flex-col flex-wrap gap-2 min-h-9 p-2 border border-[#ddd] rounded">
                {expertise.map((tag, index) => (
                  <span
                    key={index}
                    className="flex max-md:w-fit items-center gap-2 bg-[#EBFCF4] text-[#016853] py-1 px-2.5 rounded text-sm"
                  >
                    {tag}
                    <span
                      className="cursor-pointer text-[#016853] text-sm font-semibold"
                      onClick={() => handleRemoveTag(index)}
                    >
                      &times;
                    </span>
                  </span>
                ))}
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleAddTag}
                  className="border-none outline-none flex-1 text-sm min-w-[60px]"
                  placeholder="Type and press Enter"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-8 text-right">
              <button
                type="submit"
                className="py-2.5 px-5 bg-[#016853] rounded text-sm font-semibold text-white cursor-pointer transition-all duration-200 hover:bg-[#01523f]"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default About;
