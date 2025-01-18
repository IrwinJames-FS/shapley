const { Transformer } = require('@parcel/plugin');

module.exports = new Transformer({
  async transform({ asset }) {
	// Ensure 'use client' stays at the very top
	const content = await asset.getCode()
	const hasUseClient = content.includes("'use client'");
	
	if (hasUseClient) {
	  // Remove existing 'use client' if present
	  const cleanedContent = content.replace(/^['"]use client['"];?\s*/m, '');
	  
	  // Prepend 'use client' to the start of the file
	  const modifiedContent = "'use client';\n" + cleanedContent;
	  asset.setCode(modifiedContent);
	}
	
	return [asset];
  }
});