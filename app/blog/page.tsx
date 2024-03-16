import { getTags } from "@/app/actions/getTags";
import Search from "@/app/components/Header";

const blogs = async () => {
  const tags = await getTags();

  return (
    <div>
      <Search
        name="Personaliz.ai Blog"
        description="Unlocking Your Digital Persona: Exploring the Power of Personaliz.ai!"
        tags={tags}
      />
    </div>
  );
};

export default blogs;
