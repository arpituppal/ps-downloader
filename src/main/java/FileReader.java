import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.apache.commons.io.FileUtils;

public class FileReader {

	public static void main(String[] args) {
		try {
			List<String> lines = Files.readAllLines(Paths.get("/Users/r0y000t/Desktop/toDownload.txt"));
			String rootDir = "/Users/r0y000t/Downloads/lectures/"+lines.get(0)+"/";
			for (int i = 1; i < lines.size(); i++) {
				String line = lines.get(i);
				if(line.length()<3)
					continue;
				line = line.substring(1, line.length()-1);
				String[] videoDetails = line.split("\\|");
				saveFileFromUrlWithCommonsIO(rootDir+videoDetails[0]+"/"+videoDetails[1], videoDetails[2]);
				System.out.print("\r Progress - "+(int)((float)i/(float)(lines.size()-1)*100)+"%");
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static void saveFileFromUrlWithCommonsIO(String fileName, String fileUrl)
			throws MalformedURLException, IOException {
		FileUtils.copyURLToFile(new URL(fileUrl), new File(fileName));
	}
	
}
