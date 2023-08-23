import Author from "../models/author.model"

export async function getAuthors( id:number) {
  try {
    const authors = await Author.findAll({
      where: {
        group_id: id,
      }
    })
    return {
      message: "Authors retrieved successfully",
      data: authors,
    }
  } catch (error: any) {
    return {
      message: "Error retrieving authors",
      error: error.message,
    }
  }
}
