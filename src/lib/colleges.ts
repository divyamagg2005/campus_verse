
export interface College {
  id: string;
  name: string;
}

export const colleges: College[] = [
  { id: "stanford", name: "Stanford University" },
  { id: "mit", name: "Massachusetts Institute of Technology" },
  { id: "harvard", name: "Harvard University" },
  { id: "caltech", name: "California Institute of Technology" },
  { id: "ucla", name: "University of California, Los Angeles" },
  { id: "berkeley", name: "University of California, Berkeley" },
  { id: "vit", name: "Vellore Institute of Technology" },
  { id: "iitb", name: "Indian Institute of Technology Bombay" },
  { id: "iitd", name: "Indian Institute of Technology Delhi" },
  { id: "iitm", name: "Indian Institute of Technology Madras" },
  { id: "iitk", name: "Indian Institute of Technology Kanpur" },
  { id: "iitkgp", name: "Indian Institute of Technology Kharagpur" },
  { id: "bits", name: "Birla Institute of Technology and Science, Pilani" },
  { id: "srm", name: "SRM Institute of Science and Technology" },
  { id: "manipal", name: "Manipal Academy of Higher Education" },
];

export const getCollegeById = (id: string): College | undefined => {
  return colleges.find(college => college.id === id);
};
