export const styles = {
card: {
  width: "90%",
//   maxWidth: 480,
  padding: 16,
  margin: "0 auto",
  borderRadius: 12,
  background: "#fff",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
},

  title: {
    marginBottom: 12,
    fontSize: 16,
    fontWeight: 600,
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginBottom: 12,
  },

  row: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 10px",
    borderRadius: 8,
    cursor: "pointer",
    transition: "background 0.15s",
  },

  rowSelected: {
    background: "#eef2ff",
    fontWeight: 600,
  },

  icon: {
    opacity: 0.7,
  },

  name: {
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",

  textAlign: "left",   // ← これを追加
  },

  actions: {
    marginLeft: 8,
    display: "flex",
    gap: 6,
    alignItems: "center",
  },

  actionButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "#6b7280",       // muted slate
    fontSize: 14,
    padding: 6,
    borderRadius: 6,
    opacity: 0.7,
    transition: "opacity 120ms, color 120ms",
  },

  addRow: {
    display: "flex",
    gap: 6,
    marginTop: 8,
  },

  input: {
    flex: 1,
    padding: "6px 8px",
    borderRadius: 6,
    border: "1px solid #ccc",
  },

  addButton: {
    width: 32,
    borderRadius: 6,
    border: "none",
    cursor: "pointer",


  display: "flex",
  justifyContent: "flex-start", // ← 中身を左寄せ
  alignItems: "center",
  paddingLeft: 6,               // 余白（好みで）
  },
};
