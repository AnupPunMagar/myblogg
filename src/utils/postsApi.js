import { supabase } from "./supabaseClient";
import { slugify } from "./slug";

// Public: only published posts. RLS allows anyone to read these (see README).
export async function fetchPublishedPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: false });
  if (error) throw error;
  return data || [];
}

// Admin only: every post including drafts. RLS requires an authenticated
// session for this to return anything — see the "Authenticated users can do
// everything" policy in the README's SQL setup.
export async function fetchAllPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("date", { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function savePost(post) {
  const payload = {
    ...post,
    slug: post.slug || slugify(post.title),
  };
  if (!payload.id) delete payload.id;

  const { data, error } = await supabase
    .from("posts")
    .upsert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deletePost(id) {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw error;
}

export async function togglePublish(post) {
  return savePost({ ...post, published: !post.published });
}
