import React from "react";

const categories = [
  { key: "", label: "All", value: "" },
  { key: "books", label: "Books", value: "books" },
  { key: "stationery", label: "Stationery", value: "stationery" },
  { key: "uniforms", label: "Uniforms", value: "uniforms" },
  { key: "gadgets", label: "Gadgets", value: "gadgets" },
  { key: "other", label: "Other", value: "other" },
];

type Props = {
  selected: string;
  onChange: (v: string) => void;
};

const CategoryFilter: React.FC<Props> = ({ selected, onChange }) => {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
      {categories.map((c) => (
        <button
          key={c.value}
          onClick={() => onChange(c.value)}
          style={{
            padding: "8px 10px",
            borderRadius: 20,
            border: selected === c.value ? "none" : "1px solid #e5e7eb",
            background: selected === c.value ? "#0b5ed7" : "#fff",
            color: selected === c.value ? "#fff" : "#111827",
            cursor: "pointer"
          }}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
