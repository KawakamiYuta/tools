import { useEffect, useState, useCallback } from "react";
import { invoke } from "@tauri-apps/api/core";

/**
 * プロジェクト管理用カスタムフック
 */
export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * プロジェクト一覧取得
   */
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await invoke("get_projects");
      setProjects(result);

      // 初回は先頭を自動選択
      if (result.length > 0 && !selectedProjectId) {
        setSelectedProjectId(result[0].id);
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [selectedProjectId]);

  /**
   * プロジェクト追加
   */
  const addProject = useCallback(async (name) => {
    if (!name?.trim()) return;

    try {
      const newProject = await invoke("add_project", { name });
      //setProjects((prev) => [...prev, newProject]);
      //setSelectedProjectId(newProject.id);
    } catch (e) {
      setError(e);
    }
  }, []);

  /**
   * プロジェクト選択
   */
  const selectProject = useCallback((projectId) => {
    setSelectedProjectId(projectId);
  }, []);

  /**
   * 初回ロード
   */
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  /**
   * 選択中プロジェクト
   */
  const selectedProject = projects.find(
    (p) => p.id === selectedProjectId
  ) || null;

  return {
    projects,
    selectedProject,
    selectedProjectId,
    loading,
    error,
    fetchProjects,
    addProject,
    selectProject,
  };
}
